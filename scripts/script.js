/* Global id variables */ 
var id = 0;
var idRecord = [];

/* Colour functions */
function color(x){
    var colorArr = ['blue','red','yellow','green'];
    const expectedIndex = x % colorArr.length;
    return colorArr[expectedIndex];
};

function colorHex(x){
    var colorArr = ['#176BEF','#FF3E30','#F7B529','#179C52'];
    const expectedIndex = x % colorArr.length;
    return colorArr[expectedIndex];
};

/* Check Queue function */
function checkQueue() {

    var customerId = document.getElementById("customerId").value;
    var queueId = document.getElementById("queueId").value;
    var customerIdHttp = '';
    console.log(customerId.length)
    if(customerId.length == 10) {
        customerIdHttp = "customer_id="+customerId+"&";
    }
    else if (customerId.length != 10 && customerId.length != 0){
        window.alert("Customer ID not valid")
        return
    }
    fetch(`https://ades-hosting-denzyl.herokuapp.com/customer/queue?`+customerIdHttp+`queue_id=`+queueId)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if(customerId.length == 0){
                document.getElementById("numberInQueue").innerHTML = "Total in queue: "+response.total
            }
            else if(response.ahead != "-1"){
                document.getElementById("numberInQueue").innerHTML = "Total in queue: "+response.total+"</br>Number ahead: "+response.ahead
            }
            else{
                document.getElementById("numberInQueue").innerHTML = "Total in queue: "+response.total+"</br><button id='submit1' class='btn btn-primary' onclick='joinQueue("+customerId+",`"+queueId+"`)'>Join Queue</button>"
            }
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
};

function joinQueue(customerId,queueId) {
    console.log(customerId,queueId)
    fetch(`https://ades-hosting-denzyl.herokuapp.com/customer/queue`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_id: customerId,
            queue_id: queueId,
        }),
    })
    .then(response => {
        window.alert("Joined Queue Succesfully")
    })
    .catch(error => {
        console.log(error);
    });
}