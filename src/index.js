import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import './index.css';

const maxDim = 50;

const options = [
  { value: 1, label: 'Schwarz/Weiss (1 Bit)' },
  { value: 2, label: 'Graustufen (2 Bit)' },
  { value: 8, label: 'Graustufen (8 Bit)' },
  { value: 'rgbDec', label: 'RGB24 (Dezimalzahlen)' },
  { value: 9, label: 'RGB9 (9 Bit)' },
  { value: 24, label: 'RGB24 (24 Bit)' },
  { value: 'runLengthDec', label: 'Lauflängencodierung mit Dezimalzahlen' },
  // { value: 'runLengthBin4', label: 'Lauflängencodierung mit Binärzahlen (4 Bit)' },
  // { value: 'runLengthBin8', label: 'Lauflängencodierung mit Binärzahlen (8 Bit)' }
];


class MyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageString: '',
      rows: 0,
      columns: 0,
      warnings: [],
      bitdepth: 0,
      placeholderCol: 'red',
      inputDisabled: true
    };
  }

  imageChangeHandler = (event) => {
    this.setState({ imageString: event.target.value });
  }

  rowDimensionChange = (value) => {
    if (value <= maxDim) {
      this.setState({ rows: value });
    } else {
      this.setState({ rows: maxDim });
    }
    if(value > 0 & this.state.columns > 0 & this.state.bitdepth != 0){
      this.setState({inputDisabled: false});
    }
  }

  columnDimensionChange = (value) => {
    if (value <= maxDim) {
      this.setState({ columns: value });
    } else {
      this.setState({ columns: maxDim });
    }
    if(this.state.rows > 0 & value > 0 & this.state.bitdepth != 0){
      this.setState({inputDisabled: false});
    }
  }



  bitdepthChangeHandler = (event) => {
    this.setState({ bitdepth: event.value });

    if(this.state.rows > 0 & this.state.columns > 0 & event.value != 0){
      this.setState({inputDisabled: false});
    }
  }


  rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  getWarning() {
    if (this.state.rows <= 0 | this.state.columns <= 0) {
      return "Lege zuerst die Dimensionen des Bildes fest!";
    } else if (this.state.bitdepth <= 0) {
      return "Lege zuerst die Codierung des Bildes fest!";
    } else {
      return "";
    }
  }

  testBinaryStr(x) {
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== "0" && x[i] !== "1") {
        return false;
      }
    }
    return true;
  }


  renderBinaryPixel(x, key) {
    let depth = this.state.bitdepth.valueOf();

    if (depth === 'rgbDec') {
      depth = 24;
    }
    if (isNaN(depth)) {
      depth = 1;
    }
    let pixelText = "";
    let pixelColor;
    let pixelDimension = parseInt((Math.round(document.getElementById("image-container").clientWidth - 0) / (this.state.columns)));
    let fontDim;

    fontDim = String(pixelDimension * 0.5) + "px";
    pixelDimension = String(pixelDimension) + "px";

    let multiplyr = 255 / (2 ** depth - 1);

    if (!x || (x.length < depth) || !this.testBinaryStr(x)) {
      pixelText = "?";
      pixelColor = this.rgb(255, 255, 255);
    } else if (depth > 8) {
      let rgbCols = this.splitNChars(x, depth / 3);
      multiplyr = 255 / (2 ** (depth / 3) - 1);
      pixelColor = this.rgb(parseInt(rgbCols[0], 2) * multiplyr, parseInt(rgbCols[1], 2) * multiplyr, parseInt(rgbCols[2], 2) * multiplyr);
    } else {
      pixelColor = this.rgb(parseInt(x, 2) * multiplyr, parseInt(x, 2) * multiplyr, parseInt(x, 2) * multiplyr);
    }

    return (
      <div
        className="pixel"
        key={"pixel_" + key}
        style={{
          backgroundColor: pixelColor,
          height: pixelDimension,
          width: pixelDimension,
          fontSize: fontDim
        }}
      >
        <span style={{ verticalAlign: "middle" }}>{pixelText}</span>
      </div>
    );
  }

  renderBinaryRow(arr, key) {

    let pixels = [];
    for (let i = 0; i < arr.length; i++) {
      pixels.push(this.renderBinaryPixel(arr[i], i));
    }

    return (
      <div
        className="image-row"
        key={"row" + key}>
        {pixels}
      </div>
    );
  }

  splitNChars(txt, num) {
    var result = [];
    for (var i = 0; i < txt.length; i += num) {
      result.push(txt.substr(i, num));
    }
    return result;
  }

  explain0() {
    switch (this.state.bitdepth) {
      case 0:
        return "";
      case 1:
        return "Die Bitsequenz soll eine Abfolge von einstelligen Binärzahlen sein. 0 wird als Schwarz und 1 als Weiss interpretiert. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert.";
      case 2:
        return "Die Bitsequenz soll eine Abfolge von zweistelligen Binärzahlen sein. 00 wird als Schwarz und 11 als Weiss interpretiert. Die Zahlen dazwischen stellen Graustufen dar. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert.";
      case 8:
        return "Die Bitsequenz soll eine Abfolge von achtstelligen Binärzahlen sein. 00000000 wird als Schwarz und 11111111 als Weiss interpretiert. Die Zahlen dazwischen stellen Graustufen dar. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert.";
      case 'rgbDec':
        return "Es wird eine Sequenz von kommagetrennten RGB-Codes erwartet. Die RGB-Codes enthalten drei durch Leerzeichen getrennte Dezimalzahlen";
      case 9:
        return "Die Bitsequenz soll eine Abfolge von neunstelligen Binärzahlen sein. Die ersten drei Stellen bestimmen die Rotintensität, die zweiten drei Stellen die Grünintensität und die letzten drei Stellen die Blauintensität. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert.";
      case 24:
        return "Die Bitsequenz soll eine Abfolge von vierundzwanzigstelligen Binärzahlen sein. Die ersten acht Stellen bestimmen die Rotintensität, die zweiten acht Stellen die Grünintensität und die letzten acht Stellen die Blauintensität. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert.";
      case 'runLengthDec':
        return "Es wird eine Sequenz von kommagetrennten Dezimalzahlen erwartet. Die Zahlen beschreiben die Lauflängencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Leerzeichen werden ignoriert und Zeilenumbrüche als Kommas interpretiert."
      case 'runLengthBin4':
        return "Es wird eine Sequenz von vierstelligen Binärzahlen erwartet. Die Zahlen beschreiben die Lauflängencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert."
      case 'runLengthBin8':
        return "Es wird eine Sequenz von achtstelligen Binärzahlen erwartet. Die Zahlen beschreiben die Lauflängencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Zeilenumbrüche, Leerzeichen und Kommas werden ignoriert."
    }
  }

  explain() {
    if (isNaN(this.state.bitdepth)) {
      return(" ");
    } else if (this.state.bitdepth <= 8) {
      return ("Pixel * Bittiefe = " + this.state.rows * this.state.columns + " * " + this.state.bitdepth +
        " = ");
    } else {
      return ("Pixel * (3 * Bittiefe) = " + this.state.rows * this.state.columns + " * (3 * " + this.state.bitdepth / 3 +
        ") = ");
    }
  }
  explain_res() {
    if (isNaN(this.state.bitdepth)) {
      return ("-");
    } else if (this.state.bitdepth <= 8) {
      return (this.state.rows * this.state.columns * this.state.bitdepth + " Bits");
    } else {
      return ( this.state.rows * this.state.columns * (3 * this.state.bitdepth / 3) + " Bits");
    }   
  }

  explain2() {
    if (this.state.bitdepth === 'runLengthDec' | this.state.bitdepth === 'rgbDec') {
      return '-';
    } else {
      return this.state.imageString.replace(/(\r\n|\n|\r)/gm, "").split(' ').join('').split(',').join('').length;
    }
  }

  renderBinaryImage() {
    let depth = this.state.bitdepth.valueOf();
    let text = this.state.imageString;
    let pixelIndex = 0;
    let grid = [];

    if (isNaN(depth)) {
      if (depth === 'runLengthDec') {
        depth = 1;
        let tmpText = text.valueOf().replace(/(\r\n|\n|\r)/gm, ",").split(" ").join("").split(",");
        let bitSeq = [];
        for (let k = 0; k < tmpText.length; k++) {
          let number = parseInt(tmpText[k]);
          if (number > (maxDim * maxDim)) {
            number = maxDim * maxDim;
          }
          if (!isNaN(number)) {
            if (k % 2 === 0) {
              for (let j = 0; j < number; j++) {
                bitSeq.push(1);
              }
            } else {
              for (let j = 0; j < number; j++) {
                bitSeq.push(0);
              }
            }
          }
        }
        text = bitSeq.join('');
      } else if (depth === 'runLengthBin4' | depth === 'runLengthBin8') {
        depth = 1;
        let splitLen;
        if (this.state.bitdepth === 'runLengthBin4') {
          splitLen = 4;
        } else {
          splitLen = 8;
        }
        let tmpText = text.valueOf().replace(/(\r\n|\n|\r)/gm, ",").split(" ").join("").split(",").join("");
        let convertedRunLenght = this.splitNChars(tmpText, splitLen);
        let bitSeq = [];
        for (let k = 0; k < convertedRunLenght.length; k++) {
          let number = parseInt(convertedRunLenght[k], 2);
          if (!isNaN(number) & (convertedRunLenght[k].length === splitLen)) {
            if (k % 2 === 0) {
              for (let j = 0; j < number; j++) {
                bitSeq.push(1);
              }
            } else {
              for (let j = 0; j < number; j++) {
                bitSeq.push(0);
              }
            }
          }
        }
        text = bitSeq.join('');
      } else {
        depth = 24;
        let tmpText = text.valueOf().replace(/(\r\n|\n|\r)/gm, ",").split(",");
        let bitSeq = [];
        for (let k = 0; k < tmpText.length; k++) {
          let rgbVals = [];
          let rgbSplit = tmpText[k].trim().split(" ");
          if (rgbSplit.length !== 3) {
            rgbVals = ['????????', '????????', '????????'];
          } else {
            for (let j = 0; j < rgbSplit.length; j++) {
              let val = parseInt(rgbSplit[j]);
              if (!isNaN(val) & val >= 0 & val <= 255) {
                let binVal = val.toString(2);
                while (binVal.length < 8) {
                  binVal = '0' + binVal;
                }
                rgbVals.push(binVal);
              } else {
                rgbVals.push('????????')
              }
            }
          }
          bitSeq.push(rgbVals.join(''))
        }
        text = bitSeq.join('');
      }

    } else {
      text = text.replace(/(\r\n|\n|\r)/gm, "").split(' ').join('').split(',').join('');
    }
    let textArr = this.splitNChars(text, depth);

    for (let i = 0; i < this.state.rows; i++) {
      let row = [];
      for (let j = 0; j < this.state.columns; j++) {
        let value = textArr[pixelIndex];

        row.push(value);
        pixelIndex += 1;
      }
      grid.push(row);
    }
    let image = [];

    for (let i = 0; i < grid.length; i++) {
      image.push(this.renderBinaryRow(grid[i], i))
    }

    return (
      <div>{image}</div>
    );
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 center-bar">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center title-container rounded">
                  <h1>Pixelbilder</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <div className="text-center title-container rounded">
                        <h5>Dimensionen</h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-12">
                              <b>Anzahl Spalten:</b>
                              <div className="float-right">
                                <NumericInput mobile min={0} max={maxDim} onChange={this.columnDimensionChange} />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <b>Anzahl Zeilen:</b>
                              <div className="float-right">
                                <NumericInput mobile min={0} max={maxDim} onChange={this.rowDimensionChange} />
                              </div>
                              <p><br></br><b>Pixel =</b> Spalten * Zeilen = {this.state.columns} * {this.state.rows} = <b>{this.state.rows * this.state.columns} Pixel</b></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <div className="text-center title-container rounded">
                        <h5>Codierung</h5>
                      </div>
                      <Select onChange={this.bitdepthChangeHandler} options={options} />
                      <p><i>{this.explain0()}</i></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="text-center title-container rounded">
                      <h5>Bitsequenz</h5>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <b>Nötige Länge der Bitsequenz:</b> {this.explain()} <b>{this.explain_res()}</b>
                        <br></br><br></br>
                        <b>Aktuelle Länge der Bitsequenz: {this.explain2()} Bits</b>
                        <br></br><br></br>
                      </div>
                      <div className="col-lg-12">
                        <textarea disabled={this.state.inputDisabled} type='text' class="flex-fill form-control prop-field" onChange={this.imageChangeHandler} placeholder={this.getWarning()} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <div className="text-center title-container rounded">
                        <h5>Pixelbild</h5>
                      </div>
                      <div id="image-container" style={{ backgroundColor: "white", display: "block", width: "100%" }}>
                        {this.renderBinaryImage()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">Contact: <a href="mailto:hooljohannes@gmail.com">Johannes Hool</a></div>
        </div>
      </div>
    );
  }
}

// ============================================================

ReactDOM.render(
  <MyForm />,
  document.getElementById('root')
);
