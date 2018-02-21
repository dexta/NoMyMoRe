<hello class="row">
<div class="col-4">
	<div class="card">
		<img class="card-img-top" src="/img/docker_head.png" style="width:320px" alt="Docker Logo">
	  <div class="card-block">
	    <h4 class="card-title">Hello Docker</h4>
	    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	  </div>
	  <ul class="list-group list-group-flush">
	    <li class="list-group-item">Hostname: {hostdata.hostname}</li>
	    <li class="list-group-item">Hostip/eth0: {hostdata.hostip}</li>
	    <li class="list-group-item">Time of session: {timeleft}</li>
	  </ul>
	</div>
</div>
<div class="col-3" each={ block,index in envlist }>
	<div class="card">
		<b>Index: { index }</b>
    <ul class="list-group list-group-flush" each={ value,key in block }>
			<li class="list-group-item">{key} : { short(value) }</li>
		</ul>
	</div>
</div>
<script>
  let that = this;
  this.envlist = [];
  this.hostdata = {};
  this.timeleft = 0;

  superagent('get','/test/env').then( (res) => {
  	that.envlist = [];
    let counter = 0;
    let blockmax = 4;
    let blockcount = 0;
    that.envlist[blockcount] = {};
    console.dir(res.body);
    let biglist = res.body;
    
    for(let el in biglist) {
      that.envlist[blockcount][el] = biglist[el]||"error";
      counter++;
      if(counter%blockmax===0) {
        blockcount++;
        that.envlist[blockcount] = {};
      }
    }
    console.dir(bidlist);
    console.dir(that.envlist);
  	that.update();
  });
  superagent('get','/hostdata').then( (res) => {
  	that.hostdata = res.body;
  	that.update();
  });
  


  this.con = (tn) => { 
  	that.timeleft = tn;
  	setTimeout( ()=> { if(tn>0) that.con(tn-1); },1000 );
  	that.update();
  }; 
  console.log("parse hello tag stated !!!!");
  this.con(30);


  this.short = (toshorting) => {
  	return toshorting.substr(0,64);
  };

</script>

</hello>