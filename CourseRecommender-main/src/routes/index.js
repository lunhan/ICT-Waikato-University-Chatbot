import express from "express";

const router = express.Router();

const data = require("../../p4p_courses.json");

const outlineURL = "https://courseoutline.auckland.ac.nz/dco/course";

const createListItems = (courses) => {
  let message = "";

  courses.forEach((course) => {
    const [dept, code] = course.code.split(" ");

    // Create a Markdown List item with course name and a link to UoA Course Outline
    message += `\n* [**${course.code}:** ${course.title}](${outlineURL}/${dept}/${code})`;
  });

  return message;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const makeString = (arr) => {
  if (arr.length === 1) return arr[0];
  const firsts = arr.slice(0, arr.length - 1);
  const last = arr[arr.length - 1];
  return firsts.join(", ") + " and " + last;
};

// E.G. http://localhost:3001/recommend?interests=Mathematics,Algorithms&results=6
router.get("/recommend", (req, res) => {
  if (!req.query.interests) {
    res.json("ERROR. No query parameter found");
    return;
  }

  // Only look at first 3 inputted interests in request
  let request = req.query.interests.split(",").slice(0, 3);
  const maxResults = req.query.results; // Max courses to recommend

  const bestMatches = [];
  const goodMatches = [];
  const fairMatches = [];

  let outputMessage = ""; // String that gets sent back to Botpress

  data.forEach((course) => {
    // Find what interests match between course tags and request
    const matches = course.tags.filter((value) => request.includes(value));
    let object = [];

    // Add course to the arrays based on how many matches there were
    if (matches.length){
      if (matches.length === 1){
        object = fairMatches;
      } else if (matches.length === request.length){
        object = bestMatches;
      } else if (matches.length === 2){
        object = goodMatches;
      } 
      object.push({"code": course.code, "title": course.title})
    }
  });

  const interests = makeString(request);
  outputMessage += `\nHere are some courses to consider if you're interested in **${interests}**:\n`;

  if (bestMatches.length){
    outputMessage += " \n**Best Matches:**"
    // Generate list of suggestions, capped at maxResults
    outputMessage += createListItems(bestMatches.slice(0,maxResults));
  } else {
    if (request.length > 1){
      outputMessage += "  \nUnfortunately there isn't a course that matches all of your interests!\n  ";
    }
  }

  if (goodMatches.length){
    outputMessage += " \n**Good Matches:**"
    outputMessage += createListItems(goodMatches.slice(0,maxResults - bestMatches.length));
  }

  if (request.length > 1 && fairMatches.length) {
    outputMessage += "  \n**Fair Matches:**";
  }
  // Shuffle single match results to minimise the chances of too many of one interest in results
  outputMessage += createListItems(
    shuffleArray(fairMatches).slice(0, maxResults - bestMatches.length - goodMatches.length)
  );

  res.json(outputMessage);
});

// E.G. http://localhost:3001/courseCodes?dept=SOFTENG
router.get("/courseCodes", (req, res) => {
  if (!req.query.dept) {
    res.json("ERROR. No query parameter found");
    return;
  }
  const dept = req.query.dept;

  let courseCodes = [];
  data.forEach((element) => {
    if (element.code.startsWith(dept)) {
      const courseCode = element.code.split(" ")[1];
      const courseTitle = element.title;
      const courseDepartment = element.code.split(" ")[0];
      courseCodes.push(`${courseDepartment} ${courseCode}: ${courseTitle}`);
    }
  });
  courseCodes.sort();

  res.json(courseCodes);
});

export default router;
