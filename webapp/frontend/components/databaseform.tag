<databaseform class="col">
 <form>
  <div class="form-group">
    <label for="nickname">Nickname</label>
    <input type="text" class="form-control" id="nickname" aria-describedby="nicknameHelp" placeholder="Enter nickname">
    <small id="nicknameHelp" class="form-text text-muted">enter your nickname/name here</small>
  </div>
  <div class="form-group">
    <label for="msgHelper">Enter a message</label>
    <textarea class="form-control" id="msgHelper" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-{colorClass()}">Submit { driver }</button>
 </form>

  <hr>
  <ul class="list-group">
    <li class="list-group-item list-group-item-{colorClass()}">Last Update at: 23:42:05</li>
    <li class="list-group-item" each="{ itemList }">
      {name} - {msg} 
    </li> 
</ul>

<script>
  let that = this;
  this.driver = opts.driver;
  this.itemList = [];
  let possible = "ABCD EFG HIJKLM NOPQRST UVWXYZabcdefghi jklmnop qrstuvwxyz       ";

  for(let i=0;i<10;i++) {
    let text = "";
    for (let j = 0,jl=Math.floor(Math.random() * 130)+10; j < jl; j++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.itemList.push({name:this.driver,msg:text});
  }

  this.colorClass = function() {
    return (this.driver==='mongo')? 'danger' : (this.driver==='sql')? 'info' : 'success';
  };


  console.log("parse databaseform tag stated !!!!");
  console.log("option value "+opts.driver);

</script>

</databaseform>