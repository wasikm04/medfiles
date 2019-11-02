import React, { Component } from 'react';
import { CardConsumer } from '../../providers/CardProvider'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import objectFields from '../ObjectFields'
class MedicalTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalTests: this.props.card.medicalTests,
            isDoctor: this.props.isDoctor
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        event.persist()
        this.setState(prevState => {
            var doctorCard = { ...prevState.doctorCard };
            doctorCard[event.target.id] = event.target.value;
            return { doctorCard };
        }
        )
    }
}

const ConnectedMedicalTests = props => (
    <CardConsumer>
        {({ card, isDoctor, updateCard }) => (
            <MedicalTests
                {...props}
                card={card}
                updateCard={updateCard}
                isDoctor={isDoctor}
            />
        )}
    </CardConsumer>
)

export default ConnectedMedicalTests