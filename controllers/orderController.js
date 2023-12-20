
exports.list = (req, res) => {
  res.send("list of orders")

}

exports.details = (req, res) => {
  res.send("details of an individual order id: "+req.params.id)

}