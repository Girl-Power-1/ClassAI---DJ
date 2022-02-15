song = "";
leftWristX = 0;
LeftWristaY = 0;
rightWristX = 0;
rightWristaY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist = " + scorLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#008080");
    stroke("#008080");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        leftWristY_divide_1000 = remove_decimals/1000;
        volume = leftWristY_divide_1000 *2 ;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.detVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}