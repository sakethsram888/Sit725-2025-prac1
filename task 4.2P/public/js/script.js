// const cardList = [
//     {
//         title: "Steavenson Falls",
//         image: "images/kitten-2.jpeg",
//         link: "You can start this walk at the Steavenson Falls car park, the hike with a look at one of the state’s tallest waterfalls. ",
//         desciption: "Following the signposts towards the Keppel Lookout, you’ll begin your ascent on a rough dirt track passing the De La Rue lookout. There are lots of hills and if there’s been rain, the track can be quite slippery so be prepared: bring plenty of water, snacks and wear sturdy shoes. The Keppel Lookout marks the halfway point on the hike, with views that stretch over towards the Cathedral Ranges on a clear day. Then begin your descent down back towards Falls Road. If you’ve got a little more energy in you, you can tack on a walk through the fern gully. "
//     },
//     {
//         title: "Cathedral Range State Park",
//         image: "images/kitten-3.jpeg",
//         link: "There are a bunch of great walks to do around the Cathedral Ranges, but Neds Gully Track is a good place to start.",
//         desciption: "It’s a steady uphill hike that takes you up to Neds Gully and Neds Saddle. From there the track veers off to Cathedral Peak, the park’s highest point at 840 metres elevation. Some bushwalking experience is recommended for this one."
//     },

// ]
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const getProjects = () => {
    $.get('/api/projects',(response) => {
        if(response.statusCode==200){
            addCards(response.data);
        }
    })
}
    

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text grey-text text-darken-4">'+item.desciption+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}



$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    getProjects();
    $('.modal').modal();
  });