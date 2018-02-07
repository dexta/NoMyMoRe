<headstatus class="row">
<div class="col" each={ checks in headstat }>
	<div class="card">
		<div class="card-block">
			<h3 class="card-title { bg-info:checks.state, bg-danger: !checks.state }">{ checks.check }</h3>
			<p class="card-text">
				{ checks.info }
			</p>
		</div>
	</div>
</div>
<script>
  let that = this;
  this.headstat = {};

  superagent('get','/healthcheck').then( (res) => {
  	that.headstat = res.body;
  	that.update();
  });

  console.log("parse headstatus tag stated !!!!");

</script>

</headstatus>