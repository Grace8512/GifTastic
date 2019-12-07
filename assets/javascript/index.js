$(document).ready(function(){

    var instruments = [ "Guitar", "Violin", "Cello", "Double bass", "Harp", 
                        "Trombone", "Tuba", "French Horn", "Trumpet", "Saxophone",
                        "piano", "drum", "Marimba", "clarinet", "Ocarina"];
    //
    for(var i=0; i<instruments.length; i++){
        var button = $("<button style='margin:5px; padding: 8px; font-size: 12px; font-weight:bold;'>");
        button.text(instruments[i]);//var지정해줘서 따옴표 쓰지 않음. 
        $("#instrument-buttons").append(button);
    }

    $("#add-instrument").click(function(){
        //새로운 버튼 만든다. 
        var text = $("input").val();
        if(text && text.trim() !== ""){
            var button = $("<button style='margin:5px; padding: 8px; font-size: 12px; font-weight:bold;'>");
            //유저가 타이핑한 값을 새로운 버튼에 지정해줌.
            button.text(text);
            //밸류펑션을 선택하면 유저가 타이핑하는 값이 들어가게 한다. );//var지정해줘서 따옴표 쓰지 않음. 
            $("#instrument-buttons").append(button);  
        }else{
            alert("put in some text!");
        }
    });

//index에 있는 instrument id를 가진 div안에 버튼을 클릭할때 이미지가 나타나게 하는 펑션
//"#instrument-buttons" 중 버튼을 클릭하면 이 펑션이 불려진다. 
    $("#instrument-buttons").on("click","button",function(){
        var suchStr = $(this).text();
        if(suchStr !== "Add Instrument!"){
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + suchStr + "&api_key=IaYXOd8Mm6Vsyb18sU5VkPtSP5H0utcC&limit=10&rating=pg-13";
        //q=검색어
        //&limit=10<-이미지 갯수 설정
        //&rating=g(모든연령),pg(일부연령제한)-13,r(성인연령)

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response){

        var results = response.data;
        var instrumentDiv = $("#instrument-img");
        instrumentDiv.html("");//처음에 클릭한 이미지들은 지워지고 나중에 클릭한 이미지들이 보일 수 있게 만드는 펑션
        for(var i=0; i<results.length; i++){ 
        var rating = results[i].rating;//연령제한
        var p = $("<p>").text(rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
            console.log(animated);
            console.log(still);
        var instrumentImg = $("<img>");
        instrumentImg.attr("src", still);
        instrumentImg.attr("data-still", still);
        instrumentImg.attr("data-animated", animated);
        instrumentImg.attr("data-state","still");
        //여기서 클래스를 만들어 줘서 이미지에 펑션을 넣을 수 있게 만든다. 
        instrumentImg.addClass("instrument-img");

        instrumentDiv.append(p);
        instrumentDiv.append(instrumentImg);
            console.log(instrumentImg);
        instrumentImg.click(function(){
            var eachImg = $(this).attr("data-state");
            console.log(this);
            if(eachImg === "still"){
                $(this).attr("src", $(this).attr("data-animated"));
                $(this).attr("data-state", "animate");
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
             }
            console.log(this);  
        });
        };
    });
    }   
});
  
});