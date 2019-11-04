import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import objectFields from '../ObjectFields'

export default class MedicalTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicalTest: this.props.medicalTest,
      patientMail: this.props.user,
      isDoctor: this.props.isDoctor,
      image: null
    };
    this.saveMedicalTest = this.saveMedicalTest.bind(this);
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      var medicalTest = { ...prevState.medicalTest };
      medicalTest[event.target.id] = event.target.value;
      return { medicalTest };
    })
  }

  download = (event, fileId, userMail) => {
    event.preventDefault();
    const axios = require('axios');
    axios.get('/download/' + userMail + "/" + fileId, { withCredentials: true })
      .then((response) => {
        console.log(response.blob);
        const filename = response.headers.get('Content-Disposition').split('filename=')[1];
        console.log(filename)
      })
      .catch(function (error) {
        console.log(error);
        alert("Dane nie zostały pobrane ze względu na błędy")
      })
  }

  loadFile = (event) =>{
    event.preventDefault();
    console.log(event.target);
    const imagedata = event.target.files[0];
    this.setState({image: imagedata});
  }
  upload = (event, userMail, testId, image) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    const axios = require('axios');
    axios.post('/upload/' + userMail + "/" + testId, data, { withCredentials: true })
      .then((response) => {
        alert(response.data)
      })
      .catch(function (error) {
        console.log(error);
        alert("Dane nie zostały zapisane ze względu na błędy")
      })
  }

  saveMedicalTest = (event) => {
    event.preventDefault();
    const completedMedicalTest = { ...this.state.referral, userMail: this.state.patientMail }
    const axios = require('axios');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.put('/medical-test', completedMedicalTest, config, { withCredentials: true })
      .then((response) => {
        console.log(response);
        alert("Pomyślnie zapisano kartę")
      })
      .catch(function (error) {
        console.log(error);
        alert("Dane nie zostały zapisane ze względu na błędny/już istniejący email")
      })
  }

  render() {
    return (
      <form
        key={this.state.medicalTest._id}
        className={{
          container: {
            display: 'flex',
            flexWrap: 'wrap',
          }
        }}
        onSubmit={this.saveMedicalTest}>
        <Grid
          container
          justify="space-around"
          spacing={2}
          //direction="column"
          alignItems="center"
        >
          {objectFields(this.state.medicalTest, this.state.isDoctor, this.handleChange)}
          {this.state.medicalTest.fileId != null ? // onClick={(e) => this.download(e, this.state.medicalTest.fileId, this.state.patientMail)}
            <Grid item xs={6} sm={6}>
              <Button variant="contained" component="span" >
                <a href={"http://localhost:8080/download/" + this.state.patientMail + "/" + this.state.medicalTest.fileId} rel="noopener noreferrer" target="_blank" >
                  Pobierz badanie 
               </a>
              </Button>
            </Grid>
            : this.state.isDoctor ?
              <Grid item xs={6} sm={6}>
                <input
                  required
                  accept="*"
                  id="contained-button-file"
                  type="file"
                  onChange={this.loadFile}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" onClick={(e) => this.upload(e,  this.state.patientMail,this.state.medicalTest._id, this.state.image)}>
                    Zapisz dokument badania
                  </Button>
                </label>
              </Grid>
              : null}
        </Grid>
        {this.state.isDoctor ?
          <Grid
            key
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              type="submit"
              id="button"
              color="primary"
              variant="contained"
            >
              Zapisz
                        </Button>
          </Grid>
          :
          null}
      </form>
    )
  }
}