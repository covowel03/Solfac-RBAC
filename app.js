const express = require('express');
const createHttpErrors = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express;