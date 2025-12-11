import express from 'express'


const app = express()
const port = 3000

app.use("/assets", express.static('src/assets'));


app.set("view engine", "hbs");
app.set("views", "src/views");
// req dari client ke server
// res dari server ke client
app.get('/', home);

app.get('/myProject', myProject);

app.get('/detail/:id',myProjectDetail);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let data = [
  {
    id:1,
    project:"Dumbways Website",
    start: "11 Desember 2025",
    end:"11 Januari 2025",
    duration:"3 Bulan",
    description:"Web that used for dumbways student, it was deployed and can be checked on google. Happy Coding"
  },
    {
    id:2,
    project:"Dumbways Mobile App",
    start: "2 Maret 2026",
    end:"2 April 2026",
    duration:"3 Bulan",
    description:"App that used for dumbways student, it was deployed and can be downloaded on playstore. Happy Download"
  },
    {
    id:3,
    project:"Dumbways ",
    start: "4 Mei 2026",
    end:"4 Juni 2026",
    duration:"3 Bulan",
    description:"Web that used for dumbways student, it was deployed and can be checked on google. Happy Coding"
  }
]

function home(req, res){
  res.render("index");
}


function myProject(req, res){
  res.render("myProject", {data})
}

function myProjectDetail(req, res){
  let {id} = req.params;

  let result = data.find((element) => element.id == id);

  // console.log(result);

  res.render("detail" , {result});
  
}


