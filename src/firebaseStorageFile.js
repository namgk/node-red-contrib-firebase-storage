const FirebaseStorageFileNode = require('./firebaseStorageFileNode');

function validateNodeConfig(n){
  if (!n.object){
    throw "No object specified";
  }

  if (!n.operation){
    throw "No operation specified";
  }

  if (!n.admin) {
    throw "No admin specified";
  }
}

module.exports = function(RED) {
  "use strict";

  RED.nodes.registerType("firebase storage file", function(n) {
    validateNodeConfig(n)

    RED.nodes.createNode(this,n);
    var node = this;

    node.object = n.object;
    node.operation = n.operation;
    node.admin = RED.nodes.getNode(n.admin);

    const firebaseStorageFileNode = new FirebaseStorageFileNode(node)
    firebaseStorageFileNode.setStatusCallback(node.status.bind(node))

    node.on('input', msg => {
      firebaseStorageFileNode.onInput(msg, node.send.bind(node), node.error.bind(node))
    })
  });
}


