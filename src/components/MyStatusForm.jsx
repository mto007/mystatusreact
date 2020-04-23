import React, { useState } from "react";
import { Form, ToggleButton, ToggleButtonGroup, Button } from "react-bootstrap";
import { geolocated } from "react-geolocated";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyStatusForm.scss";
import { CreateMyStatus } from "./MyStatusData";
import {
  faGrin,
  faSmile,
  faMeh,
  faFrown,
  faAngry,
} from "@fortawesome/free-solid-svg-icons";

const StatusSchema = yup.object().shape({
  status: yup.number().required().positive().integer(),
  statusDate: yup.string(),
  latitude: yup.number(),
  longitude: yup.number(),
  postCode: yup.string(),
  city: yup.string(),
  age: yup.number().integer().min(0).max(120),
  sex: yup.number(),
  addInfo: yup.string(),
});

function MyStatusForm({ coords, isGeolocationEnabled }) {
  const [addInfo, setAddInfo] = useState("");
  const [status, setStatus] = useState(0);
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState(0);
  const [errors, setErrors] = useState("");

  const handleSubmit = (evt) => {
    setErrors("");
    const form = evt.currentTarget;
    if (form.checkValidity() === true) {
      // prevent refresh
      evt.preventDefault();
      evt.stopPropagation();

      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let latitude = 0;
      let longitude = 0;
      if (isGeolocationEnabled) {
        latitude = coords.latitude;
        longitude = coords.longitude;
      }
      const input = {
        status: status,
        statusDate: date,
        latitude: latitude,
        longitude: longitude,
        postCode: postCode,
        city: city,
        age: age,
        sex: sex,
        addInfo: addInfo,
      };
      // add new status
      const myInput = {
        input,
      };

      StatusSchema.validate(input)
        .then(function () {
          CreateMyStatus(myInput);
        })
        .catch(function (err) {
          setErrors("Please enter your mood");
        });
    }
  };

  const handleStatusChange = (val) => {
    setStatus(val);
  };

  return (
    <>
      <h1>Covid-19 Quarantine Mood Tracker</h1>
      <div visible={errors !== "" ? "true" : "false"} className="error">
        {errors}
      </div>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label>How are you feeling today?</Form.Label>
        </div>
        <ToggleButtonGroup
          aria-label="mystatus"
          type="radio"
          className="btnGroup"
          value={status}
          onChange={handleStatusChange}
          name="radio"
        >
          <ToggleButton
            name="radio"
            value={1}
            variant="secondary"
            className="mybtn"
          >
            <FontAwesomeIcon icon={faAngry} className="icon miserable" />
          </ToggleButton>
          <ToggleButton
            name="radio"
            value={2}
            variant="secondary"
            className="mybtn"
          >
            <FontAwesomeIcon icon={faFrown} className="icon unhappy" />
          </ToggleButton>
          <ToggleButton
            name="radio"
            value={3}
            variant="secondary"
            className="mybtn"
          >
            <FontAwesomeIcon icon={faMeh} className="icon normal" />
          </ToggleButton>
          <ToggleButton
            name="radio"
            value={4}
            variant="secondary"
            className="mybtn"
          >
            <FontAwesomeIcon icon={faSmile} className="icon ok" />
          </ToggleButton>
          <ToggleButton
            name="radio"
            value={5}
            variant="secondary"
            className="mybtn"
          >
            <FontAwesomeIcon icon={faGrin} className="icon happy" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Form.Group controlId="formAddInfo">
          <Form.Label>Additional information:</Form.Label>
          <Form.Control
            type="text"
            value={addInfo}
            onChange={(ev) => setAddInfo(ev.target.value)}
            placeholder="Enter additional information"
            maxLength={200}
          />
        </Form.Group>
        <Form.Group controlId="formPostCode">
          <Form.Label>Post code:</Form.Label>
          <Form.Control
            type="text"
            value={postCode}
            onChange={(ev) => setPostCode(ev.target.value)}
            placeholder="Enter postcode"
            maxLength={10}
          />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            placeholder="City where you are at the moment"
            maxLength={20}
          />
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            step={1}
            min={0}
            max={110}
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
          />
        </Form.Group>
        <div>
          <Form.Label>Sex:</Form.Label>
        </div>
        <ToggleButtonGroup
          aria-label="Sex"
          type="radio"
          className="btnGroup"
          value={sex}
          onChange={(e) => setSex(e)}
          name="radio2"
        >
          <ToggleButton
            name="radio2"
            value={1}
            variant="secondary"
            className="mybtn"
          >
            Female
          </ToggleButton>{" "}
          <ToggleButton
            name="radio2"
            value={2}
            variant="secondary"
            className="mybtn"
          >
            Male
          </ToggleButton>{" "}
          <ToggleButton
            name="radio2"
            value={3}
            variant="secondary"
            className="mybtn"
          >
            Prefer not to tell
          </ToggleButton>
        </ToggleButtonGroup>
        <Form.Group controlId="buttons">
          <Button className="button" variant="primary" type="submit">
            Submit your answer and good luck!
          </Button>
        </Form.Group>
        <label className="hop"></label>
        <input
          className="hop"
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          placeholder="Your name here"
        ></input>
      </Form>
    </>
  );
}

export default geolocated()(MyStatusForm);
