class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
    this.AllFiles = [];
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    this.AllFiles = e.target.files;
    
    let reader = new FileReader();
    
    for(i=0;i<e.target.files.length;i++){
    
    let file = e.target.files[i];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  }
    componentDidMount() {
        this.updateCanvas('');
    }
    updateCanvas(data) {
      const ctx = this.refs.canvas.getContext('2d');
      
      
      var imageObj1 = new Image();
      imageObj1.src = data;
      imageObj1.onload = function() {
        
        	   var max_size = 100,
                    width = imageObj1.width,
                    height = imageObj1.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }

        
        ctx.drawImage(imageObj1,0,0, width, height);
    }
    }  
  
  render() {
    //for(i=0; i<=this.AllFiles.length;i++){
    
    let {imagePreviewUrl} = this.state;
    //console.log(this.state);
    let $imagePreview = null;
    let $canvasData = null;
      $canvasData = (<canvas width="100" height="100" ref="canvas" />);
    if (imagePreviewUrl) {
      this.updateCanvas(imagePreviewUrl);
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="previewComponent">
        <div className="canvasWrap">
          {$canvasData}
        </div>
        
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" multiple 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));
