var doc;

function createResume () {
	var win = window.open("", "title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=463, height=600, top="+(0)+", left="+((screen.width/2)-(460/2)));
	doc = win.document;
	doc.write('<html><head><title>Brian McLendon\'s Resume</title><link rel="stylesheet" type="text/css" href="briWeb.css"></head><body>');
	doc.body.className = "resume_body";
	win.focus();

	// var backB = doc.createElement('div');
	// backB.className = "resumeBackButton";
	// backB.innerHTML = "<-Back To BrianMcLendon.com";
	// backB.onclick = function() { window.close(); };   
	// doc.body.appendChild(backB);

	helper_CreateElements('title');
    helper_CreateElements('contact-info');
    helper_CreateElements('sub-title');
    helper_CreateElements('small-bio');
    helper_CreateElements('tech-proficiencies');
    helper_CreateElements('experience');
    helper_CreateElements('education');
}

function helper_CreateElements(e_toCreate) {
    switch (e_toCreate) {
        case 'title': helper_CreateElement('h1', resume_text.title, e_toCreate, doc.body); break;
        case 'contact-info': helper_CreateElement('div', resume_text.contactInfo, e_toCreate, doc.body); break;
        case 'sub-title': helper_CreateElement('div', resume_text.subTitle, e_toCreate, doc.body); break;
        case 'small-bio': helper_CreateElement('div', resume_text.smallBio, e_toCreate, doc.body); break;
        case 'tech-proficiencies': helper_CreateElement('div', resume_text.tech_proficiencies, e_toCreate, doc.body); break;
        case 'experience': helper_CreateElement('div', resume_text.experience, e_toCreate, doc.body); break;
        case 'education': helper_CreateElement('div', resume_text.education, e_toCreate, doc.body); break;
        default: console.log('Error Creating Resume Element'); break;
    }
}

function helper_CreateElement(e_type, e_content, e_class, e_parent) {
    var newElement_main = doc.createElement(e_type);

    if(e_content.hasOwnProperty('text')){ newElement_main.innerHTML = e_content.text
    }else{ newElement_main.innerHTML = e_content; }

    newElement_main.className = 'resume_' + e_class;

    e_parent.appendChild(newElement_main);

    helper_CreateElement_children(e_type, e_content, e_class, newElement_main);
}

function helper_CreateElement_children(e_type, e_content, e_class, e_parent) {
    if (e_content.hasOwnProperty('children')){
        let newElement_UL = doc.createElement('ul');
        doc.body.appendChild(newElement_UL);

        Object.keys(e_content.children)
        .forEach(function eachKey(key) { 
            helper_CreateElement('li', e_content.children[key], e_class, newElement_UL);
        });
    }

    if (e_content.hasOwnProperty('child')){
        Object.keys(e_content.child)
        .forEach(function eachKey(key) { 
            helper_CreateElement('div', e_content.child[key], e_class, doc.body);
        });
    }

    if (e_content.hasOwnProperty('experiences')){
        var newElement_holder__experiences = doc.createElement('div');
        newElement_holder__experiences.className = 'resume_' + e_class;
        e_parent.appendChild(newElement_holder__experiences);

        Object.keys(e_content.experiences)
        .forEach(function eachKey(key) {
            helper_CreateElement(
                'div', 
                '<br><u>' + e_content.experiences[key].main + '<br></u>' +
                '<div>' + e_content.experiences[key].info + '</div>',
                'job', 
                newElement_holder__experiences
            );
            
            // if (e_content.experiences[key].hasOwnProperty('achievements')){
            //     let achievements_UL = doc.createElement('div');
            //     newElement_holder__experiences.appendChild(achievements_UL);

            //     helper_CreateElement('div', 'Key Achievements:', e_class, achievements_UL);

            //     // Object.keys(e_content.experiences[key].achievements)
            //     // .forEach(function eachKey(k) { 
            //     //     helper_CreateElement('li', e_content.experiences[key].achievements[k], e_class, newElement_holder__experiences);
            //     // });
            // }
        });
    }

    if (e_content.hasOwnProperty('schooling')){
        var newElement_holder__schooling = doc.createElement('div');
        newElement_holder__schooling.className = 'resume_' + e_class;
        e_parent.appendChild(newElement_holder__schooling);

        Object.keys(e_content.schooling)
        .forEach(function eachKey(key) {

            helper_CreateElement(
                'div', 
                '<br><u>' + e_content.schooling[key].main + '<br></u>' +
                '<div>' + e_content.schooling[key].info + '</div>',
                'education', 
                newElement_holder__schooling
            );
        });

        helper_CreateElement('span', '<br>', 'e_class', newElement_holder__schooling);
    }
}

const resume_text = {
    title: {
        text: 'Brian Lee McLendon II'
    },

    contactInfo: {
        text: '',
        children: {
            address: 'West Orange, New Jersey',
            phone: '609-213-3356',
            email: 'mclendon.brian@gmail.com',
            website: 'brianmclendon.com'
        }
    },

    subTitle: {
        text: '<br><b>Web Developer & User Experience Specialist</b>',
        child: {
            subtext:  'Multifaceted tech professional with extensive experience in design and frontend development'
        }
    },

    smallBio: {
        text: '<br>Dynamic, highly technical, hands-on Web Developer and User Experience Specialist with a wealth of knowledge and experience enhancing the user experience, utilizing coding/technical tools to develop web/digital content, and collaborating with clients to translate their requirements into actionable project deliverables. Additional experience in graphic design for print and digital media.',
        child: {
            subtext: '<br><i>Web & Digital Content Development / Project Management / User Experience / Technical Problem Solving / Graphic Design / Audio Track Creation</i>'
        }
    },

    tech_proficiencies: {
       text: '<br><br><b>Technical Proficiencies & Tools</b>',
       child: {
           subtext: '<i>Adobe Creative Suite, Adobe Script, APIs, Bootstrap, Browser-Agnostic HTML5, CLI, C#, Cross-Browser Responsive CSS, Firebase, Git, Github, Graphic Design, Javascript (ES6/7), jQuery, JSON, MacOS, Multitrack Recording, MySQL, Node.js, NPM, Logic Pro, PC, Photography, React, Unity 3D, WordPress</i>'
       }
    },

    experience: {
        text: '<br><br><b>Professional Experience</b><br>',
        experiences: {
            job_1: {
                main: 'Frontend Engineer (2018 – Present): AlphaPoint Corporation, New York, New York',
                info: 'Architect, maintain, and update multiple frontend interfaces utilized within AlphaPoint’s industry-leading blockchain solutions and digital currency exchanges.',
                achievements: {
                    one: 'Pioneer the use of new methodology and technology that supports blockchain and digital currency. Streamline and simplify exchange web interfaces and the trading of the new currency.',
                    two: 'Quickly triage errors and proactively maintain frontend interfaces that support web and other technology elements. Avoid and virtually eliminate any critical or unplanned downtime.'
                }
            },
            job_2: {
                main: 'McLendon Computer Arts (2014 – Present): Ewing, New Jersey',
                info: 'Serve a variety of clients and support their endeavors for web page, audio, coding, 3D modeling, and application design. Transform their ideas into creative digital and audio solutions.',
                achievements: {
                    one: 'Author, record, and produce audio tracks. Gather requirements from clients and secure the necessary resources to support on-time delivery of key project milestones.',
                    two: 'Strengthen client web/digital presence through the use of technical tools to develop websites and other interactive content. Improve their traffic and retention of key customers.'
                }
            },
            job_3: {
                main: 'Senior Web Developer (2017 – 2018): Clikz Digital, Little Falls, New Jersey',
                info: 'Appropriately designed and developed client collateral for print and digital media sources. Generated interesting and unique web pages that encouraged repeat visits.',
                achievements: {
                    one: 'Designed and presented logo and web designs to clients for approval. Translated their ideas and requirements into creative solutions and technical specifications.'
                }
            },
            job_4: {
                main: 'Teaching Assistant (2017 – 2018): Trilogy Education via Rutgers U, New Brunswick, New Jersey',
                info: 'Assisted teachers and students with the Coding Bootcamp program at the University. Routinely advised on skills, methods, and techniques that supported their practical work during the entire program.',
                achievements: {
                    one: 'Actively engaged the class in discussion to promote knowledge/information sharing. Honed students coding skills through interactive discussion and hands-on exercises.'
                }                
            },
            job_5: {
                main: 'Layout Design & Product Photography (2016): Franklin Machine Products, Lumberton, NJ',
                info: 'Developed creative solutions for photography, layout, design, and programming objectives while improving the speed of production and maintaining brand standards.'
            },
            job_6: {
                main: 'Event Technician / Photographer (2015 — 2016): We Love Photobooths, Lambertville, NJ',
                info: 'Collaborated on site with proprietary hardware/software setup for photography and printing. Championed all aspects of the transportation, assembly, and operation of custom technology.'
            },
            job_7: {
                main: 'Broadcast Graphics Designer (2011 — 2013): NBC Sports, Philadelphia, Pennsylvania',
                info: 'Constructed new graphics each day according to producer and talent concepts to illustrate and illuminate show topics for two live and one taped daily TV News/talk shows.',
                achievements: {
                    one: 'Re-invent topical graphics as stories develop and expand each day.',
                    two: 'Undertook the huge task of converting all 4x3 graphics in use to 16x9 HD as the network made the transition to high definition.'
                }
            },
            job_8: {
                main: 'Freelance Graphic Designer (2011 — 2012): G.Girl, New York, New York',
                info: 'Efficiently produced design concepts and illustrations for a prominent women’s clothing line.'
            },
            job_9: {
                main: 'Studio Assistant (2011): Caterina Nelli Studio, Rome, Italy',
                info: 'Assisted the artist via studio management, Image manipulation, Painting, Sculpture, Photography, Framing, and minor woodwork tasks that supported production.'
            },
            job_10: {
                main: 'Designer (2010): The Village Copier, New York',
                info: 'Developed in store Signage, Advertisements, and illustrations, as well as client-facing projects.'
            },
        }
    },

    education: {
        text: '<br><br><b>Education & Training</b><br>',
        schooling: {
            school_1: {
                main: 'Bachelor of Arts in Graphic Design',
                info: 'Rowan University, Glassboro, New Jersey'
            },
            school_2: {
                main: 'Associate of Arts in Communication Design',
                info: 'Fashion Institute of Technology, New York, New York'
            },
            school_3: {
                main: 'Javascript Full Stack Certificate',
                info: 'Rutgers University, New Brunswick, New Jersey'
            },
        }
    }
};