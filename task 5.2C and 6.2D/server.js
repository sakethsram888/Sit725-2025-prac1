const mongoose = require('mongoose');
var express = require("express")
var app = express()
const routes = require("./routes/routes.js")


app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'views'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost:27017/myprojectDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

// using routes from userRoutes
app.use("/", routes);


const cardList = [
    {
        title: "Steavenson Falls",
        image: "images/kitten-2.jpeg",
        link: "You can start this walk at the Steavenson Falls car park, the hike with a look at one of the state’s tallest waterfalls.",
        desciption: "Following the signposts towards the Keppel Lookout, you’ll begin your ascent on a rough dirt track passing the De La Rue lookout. There are lots of hills and if there’s been rain, the track can be quite slippery so be prepared: bring plenty of water, snacks and wear sturdy shoes. The Keppel Lookout marks the halfway point on the hike, with views that stretch over towards the Cathedral Ranges on a clear day. Then begin your descent down back towards Falls Road. If you’ve got a little more energy in you, you can tack on a walk through the fern gully. "
    },
    {
        title: "Cathedral Range State Park",
        image: "images/kitten-3.jpeg",
        link: "There are a bunch of great walks to do around the Cathedral Ranges, but Neds Gully Track is a good place to start.",
        desciption: "It’s a steady uphill hike that takes you up to Neds Gully and Neds Saddle. From there the track veers off to Cathedral Peak, the park’s highest point at 840 metres elevation. Some bushwalking experience is recommended for this one.",
    }
]


app.get('/api/pjs', (req,res) => {
    // const projects = await Project.find({});
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

    
app.get("/",(req,res)=>{
    app.use(express.static(__dirname+'public'))
    res.render("index");
});
var port = process.env.port || 3006;

app.listen(port, ()=>{
    console.log("App running at http://localhost:"+port)
})