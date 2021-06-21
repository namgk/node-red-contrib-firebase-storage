function FirebaseStorageFileNode(config) {
  if (!config.admin) {
    throw "No firebase admin specified";
  }

  if (!config.object){
    throw 'Storage object Not Present';
  }

  if (!config.operation){
    throw 'Storage operation Not Present';
  }

  this.object = config.object;
  this.operation = config.operation;
  this.bucket = config.admin.bucket;
	this.onStatus = ()=>{}

  this.onInput = async function(msg, out, errorcb) {
    const objectPath = msg.object || this.object;
    const operation = msg.operation || this.operation;
  
    try {
      const [metadata] = await this.bucket.file(objectPath)[operation]();
      out(metadata);
    } catch (e){
      errorcb(e);
    }
  };

  this.setStatusCallback = function(cb) {
    this.onStatus = cb;
  };
}

module.exports = FirebaseStorageFileNode
