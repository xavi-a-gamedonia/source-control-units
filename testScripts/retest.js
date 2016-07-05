describe("Gamedonia test environments", function() {
    
    var env=null;

    beforeEach(function() {
          env = gamedonia.createTestEnvironment();
    });
     
     afterEach(function() {
        env.destroy();
        env=null;
    });

    it("run jobs", function() {

    	 var resJob = env.runJob( "orders");
    	 expect(resJob.isOk()).toBe(true);
    	 if(resJob.isOk()) {
    		 
    		 var jobData = resJob.getResult();
    		 out.println("JOB result: " +jobData);
    	 }
 	});
     
    it("load initial data", function() {
    	 
    	 // this loads the data from the orders collection in the .zip file
    	 var loadResult = env.loadTestData("20160701104630915.zip", ["orders"]);//, ["coleccionpruebaexport"]);
    	 expect(loadResult.isOk() ).toBe(true);
    	 
    });

	describe("Gamedonia user sessions", function() {

	    var user = null;
		var session = null;
		beforeEach(function() {

	    	// we create a user
	    	user = env.createUser({name:'Not Alberto', lastname:'Not Xaubet', age:80});

	    	// and log him in
	    	session = user.login();
	    });
	     
	     afterEach(function() {

	        session.logout();
	        user = null;
	        session = null;
	    });

	    it("load data into collections",function() {

	    	var loaded = session.loadData("movies",[
		                                             {"name":"The Godfather"},
		                                             {"name":"Jurassic Park"},
		                                             {"name":"Titanic"},
		                                             {"name":"Saving private Ryan"},
		                                             {"name":"Indiana Jones"}
		                                             ]);
	    	expect(loaded.isOk()).toBe(true);
			expect(loaded.getResult()).not.toBeUndefined();
			expect(loaded.getResult().length).toEqual(5);

			var moviesCount = session.count("movies", "{}");
			expect(moviesCount.isOk()).toBe(true);
			expect(moviesCount.getResult().count).toBe(5);

			var ordersCount = session.count("orders", "{}");
			expect(ordersCount.isOk()).toBe(true);
			expect(ordersCount.getResult().count).toBeGreaterThan(0);
		});
	});
});