import Dropzone from "react-dropzone";
import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import { Col, Row, Container } from "react-bootstrap";
import { Typography, withStyles } from "@material-ui/core";
import CropPortrait from "@material-ui/icons/CropPortrait";
import CropLandscape from "@material-ui/icons/CropLandscape";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const styles = (theme) => ({
  dropzone: {
    height: 100,
    borderRadius: 10,
    borderColor: "grey",
    borderStyle: "dashed",
  },
});

@inject("cropToolStore")
@observer
class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.imgPreviewCanvasRef = React.createRef();
  }

  render() {
    const { classes, cropToolStore } = this.props;
    const {
      crop,
      onDrop,
      imageSrc,
      clearScreen,
      isLandscape,
      textfieldUrl,
      setIsLandscape,
      handleCropChange,
      handleImageLoaded,
      onChangeTextField,
      handleCropComplete,
      downloadCroppedImage,
      croppedBase64ImageSrc,
    } = cropToolStore;
    const color = "#e0000b";
    return (
      <Container className="h-100" fluid>
        <Row className="mx-4 my-3 align-items-center">
          <h1 className="mb-0">Image Crop Tool</h1>
          {imageSrc && (
            <Button
              size="small"
              className="ml-3"
              variant="outlined"
              onClick={clearScreen}
              style={{ color, borderColor: color }}
            >
              Clear
            </Button>
          )}
        </Row>
        <Row className="w-100 ml-0 px-4">
          <TextField
            fullWidth
            id="image-url"
            variant="outlined"
            value={textfieldUrl}
            label="Paste Image URL"
            onChange={onChangeTextField}
            helperText="Paste image url or use an option below. eg. copy & paste this https://images-na.ssl-images-amazon.com/images/I/418aO%2BxDr%2BL._AC_SY355_.jpg"
          />
        </Row>
        <Row className="w-100 ml-0">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={[
                  classes.dropzone,
                  "d-flex w-100 m-4 justify-content-center align-items-center",
                ].join(" ")}
              >
                <input {...getInputProps()} />
                <h6 className="mb-0">
                  Drag 'n' drop an image here, or click to select an image.
                </h6>
              </div>
            )}
          </Dropzone>
        </Row>
        {imageSrc && (
          <>
            <Row className="d-flex mx-4 mb-3 align-items-center">
              <Col>
                <Row>
                  <Typography variant="h5" className="mb-0">
                    Crop Option:
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    className="ml-3"
                    variant="outlined"
                    onClick={setIsLandscape}
                    endIcon={
                      isLandscape ? (
                        <CropPortrait fontSize="inherit" />
                      ) : (
                        <CropLandscape fontSize="inherit" />
                      )
                    }
                  >
                    {isLandscape ? "Portrait" : "Landscape"}
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Typography variant="h5" className="mb-0">
                    Crop Preview
                  </Typography>
                  {croppedBase64ImageSrc && (
                    <Button
                      size="small"
                      color="primary"
                      className="ml-3"
                      variant="outlined"
                      onClick={downloadCroppedImage}
                      endIcon={<ArrowDownwardIcon fontSize="inherit" />}
                    >
                      Download
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <ReactCrop
                  crop={crop}
                  src={imageSrc}
                  onChange={handleCropChange}
                  onComplete={(crop, pixelCrop) =>
                    handleCropComplete(
                      crop,
                      pixelCrop,
                      this.imgPreviewCanvasRef.current
                    )
                  }
                  onImageLoaded={handleImageLoaded}
                />
              </Col>
              <Col>
                <Row>
                  <canvas ref={this.imgPreviewCanvasRef}></canvas>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(ImageCrop);
