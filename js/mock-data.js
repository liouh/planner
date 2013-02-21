
P('data');

COURSES = [
    { subjectCode: 'CS', catalogNumber: '106A'},
    { subjectCode: 'CS', catalogNumber: '108'},

    { subjectCode: 'COM SCI', catalogNumber: '271'},
    { subjectCode: 'COM SCI', catalogNumber: '161'},
    { subjectCode: 'COM SCI', catalogNumber: 'M51A'},

    { subjectCode: 'BIOSTAT', catalogNumber: '273'},

    { subjectCode: 'MATH', catalogNumber: '51'},
    { subjectCode: 'MATH', catalogNumber: '52A'},
    { subjectCode: 'MATH', catalogNumber: '52B'},

    { subjectCode: 'ECON', catalogNumber: '41'},
    { subjectCode: 'ECON', catalogNumber: '42'},
    { subjectCode: 'STATS', catalogNumber: '202A'},
    { subjectCode: 'STATS', catalogNumber: '290'},

    { subjectCode: 'PHYSICS', catalogNumber: '10'},
    { subjectCode: 'PHYSICS', catalogNumber: '17'},
    { subjectCode: 'PHYSICS', catalogNumber: '18A'},

    { subjectCode: 'CHEM', catalogNumber: '321'},
    { subjectCode: 'CHEM', catalogNumber: '333'},
    { subjectCode: 'CHEM', catalogNumber: '321B'},

    { subjectCode: 'BIOL', catalogNumber: '21'},
    { subjectCode: 'BIOL', catalogNumber: '33'},
    { subjectCode: 'BIOl', catalogNumber: '21B'},

    { subjectCode: 'EL BIOL', catalogNumber: '121'},
    { subjectCode: 'EL BIOL', catalogNumber: '133'},
    { subjectCode: 'EL BIOl', catalogNumber: '11B'},

    { subjectCode: 'FRNCH', catalogNumber: '1'},
    { subjectCode: 'FRNCH', catalogNumber: '2'},
    { subjectCode: 'FRNCH', catalogNumber: '3A'},

    { subjectCode: 'COM SCI', catalogNumber: '281'},
    { subjectCode: 'COM SCI', catalogNumber: '163'},
    { subjectCode: 'COM SCI', catalogNumber: 'M51B'},

    { subjectCode: 'MATH', catalogNumber: '53'},
    { subjectCode: 'MATH', catalogNumber: '54'},
    { subjectCode: 'MATH', catalogNumber: '55'},
];

P.data = [
	{
		id: 1,
		email: 'henry@chegg.com',
		name: 'CS',
		years: [
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[3], COURSES[6], COURSES[8] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[4], COURSES[7] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[9], COURSES[11], COURSES[14], COURSES[16] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[12], COURSES[13], COURSES[20], COURSES[19] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[18], COURSES[23], COURSES[25], COURSES[28] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[24], COURSES[26], COURSES[30], COURSES[31] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[3], COURSES[6], COURSES[8] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[4], COURSES[7] ]
					}
				]
			}
		]
	},
	{
		id: 2,
		email: 'henry@chegg.com',
		name: 'ECON',
		years: [
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[3], COURSES[6], COURSES[8] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[4], COURSES[7] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[9], COURSES[11], COURSES[14], COURSES[16] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[12], COURSES[13], COURSES[20], COURSES[19] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[18], COURSES[23], COURSES[25], COURSES[28] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[24], COURSES[26], COURSES[30], COURSES[31] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[3], COURSES[6], COURSES[8] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[4], COURSES[7] ]
					}
				]
			}
		]
	},
	{
		id: 3,
		email: 'henry@chegg.com',
		name: 'BME',
		years: [
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[8], COURSES[6], COURSES[3] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[18], COURSES[7] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[9], COURSES[11], COURSES[14], COURSES[16] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[20], COURSES[13], COURSES[12], COURSES[19] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[18], COURSES[23], COURSES[25], COURSES[28] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[24], COURSES[26], COURSES[30], COURSES[31] ]
					}
				]
			},
			{
				terms: [
					{
						name: 'Fall',
						courses: [ COURSES[0], COURSES[2], COURSES[3], COURSES[6], COURSES[8] ]
					},
					{
						name: 'Spring',
						courses: [ COURSES[1], COURSES[6], COURSES[4], COURSES[7] ]
					}
				]
			}
		]
	},

];
