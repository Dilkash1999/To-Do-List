let arr = [{name:'learn html',status:'completed',duedate:'2022-01-12'},{name:'learn js',status:'ongoing',duedate:'2022-01-12'},{name:'learn css',status:'completed',duedate:'2022-01-12'}
];

init();

let operation,index;
let temp1,temp2;

function init(){
    let div = document.createElement('div');
    document.body.append(div);
    let table = document.createElement('table');

    div.append(table);
    div.setAttribute('class','table-wrapper-scroll-y my-custom-scrollbar');

    let thead = document.createElement('thead');
let tr = document.createElement('TR');
thead.append(tr);
let td = document.createElement('TD');
td.innerText = 'Name';

let td2 = document.createElement('TD');

td2.innerText = 'Status';

let td3 = document.createElement('TD');

td3.innerText = 'Duedate';

tr.appendChild(td);
tr.appendChild(td2);
tr.appendChild(td3);

thead.append(tr);

table.appendChild(thead);

tr.style.fontSize = 'larger';
tr.style.fontWeight = 'bold';


tr.style.width = '100px';
tr.style.height = '100px';
    render();
}

//initialise table
function render(){
let rn = 0;

let table = document.querySelector('table');
table.setAttribute('class','table table-bordered table-striped mb-0');
let x = document.querySelector('table').querySelectorAll('tr');

let tbody = document.createElement('tbody');
tbody.setAttribute('class','tbody');
for(let i=1;i<x.length;i++){
    x[i].remove();
}

if(arr.length==0){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.setAttribute('colspan','3');

    //let img = document.createElement('img');
    //img.setAttribute('src','task.png');
    //img.setAttribute('alt','image');
    //td.append(img);

    td.innerHTML = '<h1>No Task Created Yet</h1>'
    tr.appendChild(td);
    tbody.appendChild(tr);
}

for(let el of arr)
{
    let tr = document.createElement('TR');
    tr.setAttribute('id',`${rn}`);
    rn++;
    let td = document.createElement('TD');
    let td2 = document.createElement('TD');
    let td3 = document.createElement('TD');
    let td4 = document.createElement('TD');
    let complete = document.createElement('button');
    complete.setAttribute('id','complete');
    complete.innerHTML = 'Complete';
    td4.append(complete);
    let td5 = document.createElement('TD');
    let delet = document.createElement('button');
    delet.setAttribute('id','delete');
    delet.innerHTML = 'Delete';
    td5.append(delet);
   
    td.innerText = el.name;
    td.setAttribute('id','name');

    td2.innerText = el.status;
    td2.setAttribute('id','status');
    td3.innerText = el.duedate;
    td3.setAttribute('id','date');
    if(el.status==='completed'){
        td.style.textDecoration = 'line-through';
        complete.style.display = 'none';
    }
    
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    let td6 = document.createElement('td');
    let b = document.createElement('button');
    b.setAttribute('id','edit');
    b.innerHTML = 'Edit';
    td6.append(b);
    tr.appendChild(td6);
    tbody.appendChild(tr);
}

table.appendChild(tbody);
table.style.width = '58%';

}

function del(event){

    let index = event.target.parentNode.parentNode.id;

    arr.splice(index,1);
    render();
}

function done(event){
    event.target.parentNode.parentNode.querySelector('#status').innerText = 'completed';
    event.target.parentNode.parentNode.querySelector('#name').style.textDecoration = 'line-through';
    event.target.style.display = 'none';
}

function addData(event){

    if(Validate()===true)
    {
        if(operation!='update')
        {
        arr.push({name : event.target.parentNode.querySelector('#name').value,
                status : 'Ongoing',
                duedate : event.target.parentNode.querySelector('#date').value
            });

            alert('Submitted');
        }

        else
        {
            arr.splice(index,1,{name:document.querySelector('form').querySelector('#name').value,status:'Ongoing',duedate:String(document.querySelector('form').querySelector('#date').value)});
            alert('Edited');
        }
        operation = 'submit';
        document.querySelector('form').querySelector('#submit').value = 'Submit';
        render();
        event.preventDefault();
    }


}

function Save(event){

    localStorage.user = JSON.stringify(arr);
    alert('Saved');
}

function Load(){
    
    arr = JSON.parse(localStorage.user);
    render();
    alert('Script has been loaded');
}

function Validate(){
    const value = document.querySelector("#name").value;
    const date = document.querySelector('#date').value;
    if(!value || !date) {
        return false;
    } else {
      return true;
    }
  }

  document.querySelector('table').addEventListener('click',function(event){
    let f = event.target.id;

    if(f=='complete'){
        done(event);
    }

    else if(f=='delete'){
        del(event);
    }

    else if(f=='edit'){
        operation = 'update';
        temp1 = event.target.parentNode.parentNode.querySelector('#name');
        temp2 = event.target.parentNode.parentNode.querySelector('#date');
        document.querySelector('form').querySelector('#name').value = temp1.innerText;
        document.querySelector('form').querySelector('#date').value = temp2.innerText;
        document.querySelector('form').querySelector('#submit').value = 'Edit';

        index = event.target.parentNode.parentNode.id;
    }
  });
