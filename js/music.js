// Initialize Parse app
Parse.initialize('FBpsm9tPoAlYlMqZ5B7t0Q9jpWJOLtcma1hc5WzQ', "fJHCpD1l2CGKtoQyAd8Qh6602cgXO9kqOYg8vZvW");

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend('Music');

// Create a new instance of your Music class 
var song = new Music();

// Set a property 'band' equal to a band name
/*song.set('band', 'Coldplay');

// Set a property 'website' equal to the band's website
song.set('website', 'http://timeline.coldplay.com/');
    
// Set a property 'song' equal to a song
song.set('song', 'Amsterdam');

// Save your instance of your song -- and go see it on parse.com!
song.save();*/

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	var music = new Music();

	// For each input element, set a property of your new instance equal to the input's value
	// var band = $('#band').val();
	// music.set('band', band);

	// var website = $('#website').val();
	// music.set('website', website);

	// var song = $('#song').val();
	// music.set('song', song);

	$(this).find('input').each(function(){
		music.set($(this).attr('id'), $(this).val())
		$(this).val('');
	});




	// After setting each property, save your new instance back to your database
	music.save(null {
        success: getData
    });
	
	return false //prevents page from reloading
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class
    var query = new Parse.Query(Music);

	// Set a parameter for your query -- where the website property isn't missing
    query.exists('website');
    // can also write query.notEqualTo('website', '') it takes two arguments
	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
    query.find({
        success:function(result) {
            buildList(result);
        }
        //alternatively you could write 'success:buildList' without () because that would execute it.
    });
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('ol').empty();
	// Loop through your data, and pass each element to the addItem function
    data.forEach(function(d){
        addItem(d)
    });
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
    var web = item.get('website');
    var bnd = item.get('band');
    var sng = item.get('song');
	
	// Append li that includes text from the data item
    var li = $("<li> Check out " + bnd + " I love their song " + sng + "</li>");
    var button = $('<button class ="btn-xs btn-danger"><span class="glyphicon glyphicon-remove"</span></button>')
    button.on("click", function() {
        item.destroy({
            success: getData
        });
    })

    $('ol').append(li);


	
	// Time pending, create a button that removes the data item on click
	$('<button/>', {
        text: 'remove data',
        id: 'btn_rmv',
        click: function() {
            $('ol').empty()
        }
    });
}

// Call your getData function when the page loads
getData();

