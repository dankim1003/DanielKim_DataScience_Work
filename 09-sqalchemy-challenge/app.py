import datetime as dt
from dateutil.relativedelta import relativedelta
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

engine = create_engine('sqlite:///Resources/hawaii.sqlite', echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.measurement

Measurement = Base.classes.measurement
Station = Base.classes.station

# Create session from Python to the DB
session = Session(engine)
app = Flask(__name__)

one_year = '2016-08-23'

@app.route("/")
def home():
    return (
        f"/api/v1.0/precipitation <br> Returns a JSON list of percipitation data for the dates between 8/23/16 and 8/23/17<br><br>"
        f"/api/v1.0/stations<br>Returns a JSON list of the weather stations<br/><br/>"
        f"/api/v1.0/tobs<br/>Returns a JSON list of the Temperature Observations (tobs) for each station for the dates between 8/23/16 and 8/23/17<br/><br/>"
        f"/api/v1.0/date<br/>Returns a JSON list of the minimum temperature, the average temperature, and the max temperature for the dates between the given start date and 8/23/17<br/><br/>."
        f"/api/v1.0/start_date/end_date<br/>Returns a JSON list of the minimum temperature, the average temperature, and the max temperature for the dates between the given start date and end date<br/><br/>."
        )

@app.route("/api/v1.0/precipitation")
def precipitation():
    # Date 12 months ago
    prcp_data = session.query(Measurement.date, func.avg(Measurement.prcp)).filter(Measurement.date >= one_year).group_by(Measurement.date).all()
    return jsonify(prcp_data)

@app.route("/api/v1.0/stations")
def stations():
    station_data = session.query(Station.station, Station.name).all()
    return jsonify(station_data)

@app.route("/api/v1.0/tobs")
def tobs():
    tobs_data = session.query(Measurement.date, Measurement.station, Measurement.tobs).filter(Measurement.date >= one_year).all()
    return jsonify(tobs_data)

@app.route("/api/v1.0/<date>")
def StartDate(date):
    day_data = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= date).all()
    return jsonify(day_data)

@app.route("/api/v1.0/<start>/<end>")
def startDateEndDate(start,end):
    start_end_data = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= start).filter(Measurement.date <= end).all()
    return jsonify(start_end_data)

if __name__ == "__main__":
    app.run(debug=True)


