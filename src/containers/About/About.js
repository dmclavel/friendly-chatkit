import React, { Component } from 'react';

import classes from './About.css';

class About extends Component {
    render () {
        return (
            <div className={classes.About}>
                <div className={classes.Name}>
                    <span className={classes.Highlight}> Student Data Project </span>
                    <span> University of the Philippines Los Baños </span>
                </div>
                <div className={classes.Description}>
                    <div className={classes.Line}>
                        <div className={classes.Greetings}>
                            <span> HELLO & WELCOME </span>
                            <span className={classes.Greetings__Highlight}>
                                I'm Daimler Clavel
                            </span>
                            <span className={classes.Greetings__Underline}></span>
                            <section>
                                I develop the Student Data Project just for fun. Currently a Computer Science student in my senior year. I take interest into front-end development especially
                                everything about React and Vue. I love Javascript, JSX and the idea of Component reusability in React. 
                                I am currently learning concepts about bundlers and transpilers like Webpack and 
                                Babel, respectively. I would love to learn how to create REST servers using Node.js and Express.
                            </section>
                            <section>
                                This project is created using React.js and Firebase. All of the features are still not final. More functionality will be added soon.
                                If you want to ask any question, you can email me at
                                <code> dmclavel@up.edu.ph </code>.
                            </section>
                        </div>
                    </div>
                </div>
                <div className={classes.Image}>
                    <img src="https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.0-9/43176163_902700196594437_5407684303238725632_n.jpg?_nc_cat=111&_nc_ht=scontent.fcrk1-1.fna&oh=ed1775fd7c6f72db2711bf07ab3480be&oe=5C862046" alt="about-img" />
                </div>
            </div>
        );
    }
}

export default About;