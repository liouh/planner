#!env python
"""
"""

import json

COURSES = [
    { 'subjectCode': 'CS', 'catalogNumber': '106A'},
    { 'subjectCode': 'CS', 'catalogNumber': '108'},

    { 'subjectCode': 'COM SCI', 'catalogNumber': '271'},
    { 'subjectCode': 'COM SCI', 'catalogNumber': '161'},
    { 'subjectCode': 'COM SCI', 'catalogNumber': 'M51A'},

    { 'subjectCode': 'BIOSTAT', 'catalogNumber': '273'},

    { 'subjectCode': 'MATH', 'catalogNumber': '51'},
    { 'subjectCode': 'MATH', 'catalogNumber': '52A'},
    { 'subjectCode': 'MATH', 'catalogNumber': '52B'},

    { 'subjectCode': 'ECON', 'catalogNumber': '41'},
    { 'subjectCode': 'ECON', 'catalogNumber': '42'},
    { 'subjectCode': 'STATS', 'catalogNumber': '202A'},
    { 'subjectCode': 'STATS', 'catalogNumber': '290'},

    { 'subjectCode': 'PHYSICS', 'catalogNumber': '10'},
    { 'subjectCode': 'PHYSICS', 'catalogNumber': '17'},
    { 'subjectCode': 'PHYSICS', 'catalogNumber': '18A'},

    { 'subjectCode': 'CHEM', 'catalogNumber': '321'},
    { 'subjectCode': 'CHEM', 'catalogNumber': '333'},
    { 'subjectCode': 'CHEM', 'catalogNumber': '321B'},

    { 'subjectCode': 'BIOL', 'catalogNumber': '21'},
    { 'subjectCode': 'BIOL', 'catalogNumber': '33'},
    { 'subjectCode': 'BIOl', 'catalogNumber': '21B'},

    { 'subjectCode': 'EL BIOL', 'catalogNumber': '121'},
    { 'subjectCode': 'EL BIOL', 'catalogNumber': '133'},
    { 'subjectCode': 'EL BIOl', 'catalogNumber': '11B'},

    { 'subjectCode': 'FRNCH', 'catalogNumber': '1'},
    { 'subjectCode': 'FRNCH', 'catalogNumber': '2'},
    { 'subjectCode': 'FRNCH', 'catalogNumber': '3A'},

    { 'subjectCode': 'COM SCI', 'catalogNumber': '281'},
    { 'subjectCode': 'COM SCI', 'catalogNumber': '163'},
    { 'subjectCode': 'COM SCI', 'catalogNumber': 'M51B'},

    { 'subjectCode': 'MATH', 'catalogNumber': '53'},
    { 'subjectCode': 'MATH', 'catalogNumber': '54'},
    { 'subjectCode': 'MATH', 'catalogNumber': '55'},
];

def generate_courses(how_many_courses, random_seed, already_picked):
    courses = []
    for i in range(0, how_many_courses):
        index = (random_seed + i*i) % len(COURSES)
        while index in already_picked.keys():
            index += 1

        course = COURSES[index]
        courses.append(course)
        already_picked[i] = True

    return courses;

def generate_major_course(how_many_years, random_seed):
    years = []
    already_picked_courses = {}
    for i in range(0, how_many_years):
        how_many_fall_courses = 4 + (2 % random_seed)
        random_seed += 1
        how_many_spring_courses = 4 + (2 % random_seed)
        random_seed += 1

        fall_courses = generate_courses(how_many_fall_courses, random_seed, already_picked_courses)
        random_seed += 1
        spring_courses = generate_courses(how_many_spring_courses, random_seed, already_picked_courses)
        random_seed += 1

        new_year = {
            'terms': [{ 
                'name': 'Fall',
                'courses': fall_courses,
                },{
                'name': 'Spring',
                'courses': spring_courses,
            }]
        }
        years.append(new_year)
    return years

def generate_user(majors, random_seed):
    generated_majors = []
    count = 1
    for major in majors:
        major_data = {
            'id': count,
            'email' : 'henry@chegg.com',
            'name'  : major,
            'years' : generate_major_course(4,random_seed)
        }
        random_seed += 1
        count += 1
        generated_majors.append(major_data) 
    return generated_majors

if __name__ == '__main__':
    majors = ['CS','EE','ECON','BME']
    data = generate_user(majors, 12345)

    if True:
        output = open('mock-data.csv','w')
        for major in data:
            json_data = json.dumps(major).replace('"','\\\"')
            output.write('%s,%s,"%s","2013-02-20 19:32:35"\n' % (major['id'], major['name'], json_data))
        output.close()
    else:
        output = open('mock-data.js','w')
        output.write("P('data');\n")
        output.write("\nP.data = %s;" % json.dumps(data, indent=True))
        output.close()

