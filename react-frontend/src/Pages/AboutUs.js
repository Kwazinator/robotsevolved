import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';

export default function AboutUs(props) {
    return (<div id="GameMain">
                <div class="row3">
                  <div class="column3">
                    <div class="card3">
                      <img src={"/static/images/284457_10151211078621477_839164197_n.jpg"} alt="Jane"/>
                      <div class="container3">
                        <h2>Kyle Kwasniewski</h2>
                        <p class="title3">Creator &amp; FullStack Dev.</p>
                        <p>This Project was made in order to learn React as a web-framework. If there are any features that you would like to see then feel free to email my personal email below.</p>
                        <p>robotsevolved@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div class="column3">
                    <div class="card3">
                      <img src={"/static/images/284f909d-0d5c-4ae1-b100-76c9d46ae7d4.png"} alt="Mike"/>
                      <div class="container3">
                        <h2>Jonah Tollefson</h2>
                        <p class="title3">Front-End Dev.</p>
                        <p>Went to college with these other goobers in the US and now I work professionally as a software engineer in Germany. For RobotsEvolved, I mainly worked on the frontend using React. Cats and Ultimate Frisbee are life.</p>
                      </div>
                    </div>
                  </div>
                  <div class="column3">
                    <div class="card3">
                      <img src={"/static/images/derekschultz.jpg"} alt="John"/>
                      <div class="container3">
                        <h2>Derek Schultz</h2>
                        <p class="title3">Back-End Dev.</p>
                        <p>Full time Software Engineer. Graduated from University of Wisconsin Platteville with a BS in Computer Science and Minor in Business Administration. Worked on most of the database aspect of RobotsEvolved and some back end functionality. I enjoy video games, beer, and playing darts.</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

    )
}