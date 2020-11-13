// import "babel-polyfill"; //supporting babel 7...

const fs = require('fs');
const fetchMock = require('fetch-mock');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const jsPath = __dirname + '/js/index.js';

describe('Source code is valid', () => {
  test('HTML validates without errors', async () => {
    const lintOpts = {
      'attr-bans':['align', 'background', 'bgcolor', 'border', 'frameborder', 'marginwidth', 'marginheight', 'scrolling', 'style', 'width', 'height'], //adding height, allow longdesc
      'tag-bans':['style','b'], //<i> allowed for font-awesome
      'doctype-first':true,
      'doctype-html5':true,
      'html-req-lang':true,
      'attr-name-style': false, //for meta tags
      'line-end-style':false, //either way
      'indent-style':false, //can mix/match
      'indent-width':false, //don't need to beautify
      'id-class-style':false, //I like dashes in classnames
      'img-req-alt':true
    }

    const htmlfiles = fs.readdirSync(__dirname).filter((f) => f.endsWith('.html'));
    for(let f of htmlfiles) {
      await expect(f).toHaveNoHtmlLintErrorsAsync(lintOpts);
    }
  })  

  test('CSS validates without errors', async () => {
    await expect('css/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })

  test('JavaScript lints without errors', () => {
    if(fs.existsSync(__dirname+'/js')) {
      const jsfiles = fs.readdirSync(__dirname+'/js').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect(['js/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
});

//load the HTML into the tester
//document.documentElement.innerHTML = html;

//load JavaScript libraries separately
const $ = require('jquery'); //jQuery for convenience
window.jQuery = window.$ = $; //make available to solution
let solution;/// = require(jsPath); //load the solution

describe('Render functions', () => {

  beforeAll(() => {
    fetchMock.get('*', []); //starting mock for any initial loads
    solution = require(jsPath); //load the solution -- needs to be in here for some reason
  })

  beforeEach(() => {
    document.querySelector('#div100').innerHTML = ''; //clear whatever we had before    
  })

  test('renders individual tracks', () => {
    solution.renderTrack(solution.EXAMPLE_SEARCH_RESULTS.results[1]); //render Bowie

    let img = $('#div100 img');
    expect(img.length).toBe(1); //show single img
    expect(img.attr('src')).toEqual(solution.EXAMPLE_SEARCH_RESULTS.results[1].artworkUrl100); //has correct artwork
    let trackRegex = new RegExp(solution.EXAMPLE_SEARCH_RESULTS.results[1].trackName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")); //get name, escape as regex
    expect(img.attr('alt')).toMatch(trackRegex); //(mostly) matches
    expect(img.attr('title')).toMatch(trackRegex); //(mostly) matches
  })

  test('renders search results', () => {
    solution.renderSearchResults(solution.EXAMPLE_SEARCH_RESULTS); //render sample
    
    let div100 = $('#div100 img');
    expect(div100.length).toBe(3); //3 items
    expect(div100.eq(0).attr('src')).toEqual(solution.EXAMPLE_SEARCH_RESULTS.results[0].artworkUrl100); //should all be different
    expect(div100.eq(1).attr('src')).toEqual(solution.EXAMPLE_SEARCH_RESULTS.results[1].artworkUrl100);   
    expect(div100.eq(2).attr('src')).toEqual(solution.EXAMPLE_SEARCH_RESULTS.results[2].artworkUrl100);
    
    //call again (should clear)
    solution.renderSearchResults(solution.EXAMPLE_SEARCH_RESULTS); 
    expect($('#div100 img').length).toBe(3); //still 3 items (because erased others!)
  })

  test('fetches track information and renders the result', async () => {
    fetchMock.restore(); //reset the mock
    fetchMock.getOnce('*', solution.EXAMPLE_SEARCH_RESULTS); //general mock, always return sample
    
    await solution.fetchTrackList('sample');

    let div100 = $('#div100 img');
    expect(div100.length).toBe(3); //3 items
    expect(div100.eq(1).attr('src')).toEqual(solution.EXAMPLE_SEARCH_RESULTS.results[1].artworkUrl100); //one of them matches the (sample) fetched
  })

  test('searches on form submission', (done) => {    
    //mock this search!
    const searchResult = {results:[{artistName: "Test", trackName: "Test Track", previewUrl: "test link", artworkUrl100: "test image"}]};
    //const searchUrl = "https://itunes.apple.com/search?entity=song&limit=25&term=TestSearch"
    fetchMock.restore(); //reset the mock
    fetchMock.getOnce('*', searchResult); //support any query
    
    $('#searchQuery').val('TestSearch'); //type a search

    $('button').click(); //submit!
    
    setImmediate(() => { //wait until promise has resolved (one tick)
     expect(fetchMock.lastCall()[0]).toMatch(/.*term=TestSearch/); //was called with correct url
      let records = $('#records img');
      expect(records.length).toBe(1); //only one record returned.
      expect(records.eq(1).attr('src')).toEqual(searchResult.artworkUrl100); //shows right image
      done(); //callback to continue tests
    })
  });

  test('handles and displays errors', async () => {


    //test error downloading
    fetchMock.restore(); //reset the mock
    fetchMock.getOnce('*', () => { throw new Error('Could not fetch data') });
    await solution.fetchTrackList('badurl'); //call the fetch

    let alert = $('#div100 .alert.alert-danger');
    expect(alert.length).toBe(1); //should show an alert
    expect(alert.text()).toEqual("Could not fetch data");

    //clear for second test
    $('#div100').html('');

    //test empty list
    fetchMock.restore(); //reset the mock
    fetchMock.getOnce('*', {results:[]}); //return empty results.
    await solution.fetchTrackList('empty'); //call the fetch

    alert = $('#div100 .alert.alert-danger');
    expect(alert.length).toBe(1); //should show an alert
    expect(alert.text()).toEqual("No results found");
  })

  test('shows a spinner while downloading', (done) => {
    //check that the `displaySpinner()` function was called twice?

    let spinner = $('.fa-spinner');
    expect(spinner.hasClass('d-none')).toBe(true); //should not be shown initially

    fetchMock.restore(); //reset the mock
    fetchMock.getOnce('*', solution.EXAMPLE_SEARCH_RESULTS); //general mock, always return sample

    $('button').click(); //submit!
    //solution.fetchTrackList('sample'); //start downloading

    expect(spinner.hasClass('d-none')).toBe(false); //should be shown now (synchronous)

    setImmediate(() => { //wait until promise has resolved (one tick)
      expect(spinner.hasClass('d-none')).toBe(true); //should not be shown (async)      
      done(); //callback to continue tests
    })
  })
})
