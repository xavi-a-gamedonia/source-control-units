var tableName = "orders";

var orders = [
{ cust_id: "abc1", status: "A", amount: 50, ord_date: {"@ISODate":"2012-11-02T17:04:11.102Z"} },
{ cust_id: "xyz1", status: "A", amount: 100, ord_date: {"@ISODate":"2012-11-03T17:04:11.102Z"} },
{ cust_id: "xyz1", status: "D", amount: 25, ord_date: {"@ISODate":"2012-11-04T17:04:11.102Z"}  },
{ cust_id: "xyz1", status: "D", amount: 125, ord_date: {"@ISODate":"2012-11-05T17:04:11.102Z"} },
{ cust_id: "abc1", status: "A", amount: 25, ord_date: {"@ISODate":"2012-11-06T17:04:11.102Z"} }
];

function toEntityData(obj){
    var entity = gamedonia.data.newEntity();
    for(prop in obj){
        entity.put(prop,obj[prop]);
    }
    return entity;
}

orders.forEach(function(city){
    gamedonia.data.create(tableName,toEntityData(city),{
        success: function(c){
            //log.info("inserted order: " + c);
        }
    });
});

out.println("aa");

gamedonia.data.aggregate(tableName, 
[
     '{ $match: { status: "A" } }',
     '{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } }',
     '{ $sort: { total: -1 } }'
 ]
, {
    success: function(c){
        //out.println("aggregate: " + c);
        log.info(c);
        response.success(c);
        }
});