# Part 4 Project ICT Graduate School Chatbot API

This is the API used for the ICT Graduate School Chatbot. This chatbot was created for the University of Auckland Engineering Part 4 Project. This Project was completed by Reeve D'Cunha (rdcu227) and Ben Yu (byu621)

## Description

 This is an API created using Node.JS and Express. There are two endpoints currently exposed: 

1. **Course Recommender** `/recommend?interests=Mathematics,Algorithms&results=6`
This endpoint serves the Course Recommender functionality of the Chatbot. The Chatbot will call this API with the query param `interests` that contains a string representing a list of comma separated interests.
The endpoint will only look at the first three interests and return a markdown string that contains a message representing a list of courses that match the user's interests. The number of courses returned are defined by the `results` param
  
    
2. **Course Codes** `/courseCodes?dept=SOFTENG`
This endpoint serves the Course Information functionality of the Chatbot. The Chatbot will call this API with the query param `dept` that contains a string representing a specific Department.
The endpoint will look for all courses that are within this Department and return them in a list data structure.

## p4p_courses.json
This file contains a JSON object representing all courses available to MInfoTech students at the ICT Graduate School. This file is used in both endpoints as the data source.
