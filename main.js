Status = "";
objects = [];
song = "";

function preload()
{
    song = loadSound("alarm.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if(Status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("Status").innerHTML = "Status : Person Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "Person")
            {
                document.getElementById("alarm").innerHTML = "Baby Found";
                console.log("Stop");
                song.stop();
            }
            else{
                document.getElementById("alarm").innerHTML = "Baby Not Found";
                console.log("Play");
                song.play();
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("alarm").innerHTML = "Baby Not Found";
            console.log("Play");
            song.play();
        }
    }
}