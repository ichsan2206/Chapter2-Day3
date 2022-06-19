const { request } = require('express')
const express = require('express')
const moment = require('moment');

const app = express()
const port = 8000

app.set('view engine', 'hbs') // set view engine hbs

app.use('/assets', express.static(__dirname + '/assets')) 
app.use(express.urlencoded({extended: false}))

const projects = []; // array object

app.get('/', function(request, response){
//console.log(projects);

const newProject = projects.map((project) => {
    return {
        ...project
    }
});

response.render('index', {projects, newProject });

})

app.get('/contact', function(request, response){
    response.render('contact')
})


app.get('/myproject', function(request, response){
    response.render('myproject')
})

app.post('/myproject', function(request, response){
    
//durasi
    let startM = new Date (request.body.startDate).getMonth();
       let endM = new Date (request.body.endDate).getMonth()
       let startY = new Date (request.body.startDate).getFullYear();
       let endY= new Date (request.body.endDate).getFullYear();
       let selisihHasil = (startM+12*endY)-(endM+12*startY);
       let hasilFinish = Math.abs(selisihHasil);
//date convert
const projectDate = {
    startDate: request.body.startDate,
    endDate: request.body.endDate
}
//object
let dataProject = request.body;
    dataProject = {

    title: dataProject.inputTitle,
    desc: dataProject.inputDescription,
    projectDate,
    react: dataProject.cbReact,
    node: dataProject.cbNode,
    android: dataProject.cbAndroid,
    java: dataProject.cbJava,
    img: dataProject.inputImage,
    durasi: hasilFinish

    }
    projects.push(dataProject)
//    console.log(dataProject);
     response.redirect('/')
})

app.get('/detail-project/:index', function(request, response){

    let index = request.params.index
    // console.log(index);

    let blog = projects[index]

    // console.log(blog);

    response.render('detail-project',blog)
})

app.get('/delete-project/:index', function(request, response){
    // console.log(request.params.index);
    let index = request.params.index
    projects.splice(index, 1)

    response.redirect('/')
})

app.get('/update/:index', function(request, response){
    // console.log(request.params.index);
    let index = request.params.index;
    let update = projects[index];

    // console.log(edit);
    response.render('update', {index, update, projects})
})

app.post('/update/:index', function(request, response){
    //durasi
    let startM = new Date (request.body.startDate).getMonth();
       let endM = new Date (request.body.endDate).getMonth()
       let startY = new Date (request.body.startDate).getFullYear();
       let endY= new Date (request.body.endDate).getFullYear();
       let selisihHasil = (startM+12*endY)-(endM+12*startY);
       let hasilFinish = Math.abs(selisihHasil);
//date convert
const projectDate = {
    startDate: request.body.startDate,
    endDate: request.body.endDate
}

let title = request.body.inputTitle;
let desc = request.body.inputDescription;
let react = request.body.cbReact;
let node = request.body.cbNode;
let android = request.body.cbAndroid;
let java = request.body.cbJava;
let img = request.body.inputImage
//object
let  dataProjectU = {

    title,
    projectDate,
    desc,
    react,
    node,
    android,
    java,
    img,
    durasi: hasilFinish

    }

    let index = request.params.index;

    projects[index] = {
        ...projects[index],
        ...dataProjectU
    };

console.log(dataProjectU);
response.redirect('/');
})

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})
