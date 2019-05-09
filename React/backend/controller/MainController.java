package com.metehan.netas.controller;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.metehan.netas.model.Instructor;
import com.metehan.netas.model.School;
import com.metehan.netas.model.Student;
import com.metehan.netas.repository.InstructorRepository;
import com.metehan.netas.repository.SchoolRepository;
import com.metehan.netas.repository.StudentRepository;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
@Component
public class MainController {

	@Autowired
	private SchoolRepository schoolRepository;
	
	@Autowired
	private InstructorRepository instructorRepository;

	@Autowired 
	public StudentRepository studentRepository;

	@PostConstruct
	public void init() {
	   
	}
	public MainController() {
	}
	
	public MainController(SchoolRepository schoolRepository) {
		this.schoolRepository = schoolRepository;
	}

	public MainController(InstructorRepository instructorRepository) {
		this.instructorRepository = instructorRepository;
	}
	
	public MainController(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	@RequestMapping("/school")
	Collection<School> school() {
		return schoolRepository.findAll();
	}

	//For School
	@PutMapping("/school")
	void update(@Valid @RequestBody String schoolId, String schoolName, String schoolAddress, String schoolPhone) {
		School school = schoolRepository.findOne(schoolId);
		school.setSchoolAddress(schoolAddress);
		school.setSchoolName(schoolName);
		school.setSchoolPhone(schoolPhone);
		schoolRepository.save(school);
	}
	
	@GetMapping("/school/{schoolId}")
	School one(@PathVariable String schoolId) {
		return schoolRepository.findOne(schoolId);
	}
	
	@DeleteMapping("/school/{schoolId}")
    public ResponseEntity<?> deleteSchool(@PathVariable String schoolId) {
        School school = schoolRepository.findOne(schoolId);
        schoolRepository.delete(school);
        return ResponseEntity.ok().build();
    }

	 @RequestMapping(method=RequestMethod.POST, value="/school")
	    public School save(@RequestBody School school) {
	        schoolRepository.save(school);
	        return school;
	    }
	 
	 
	/* FOR INSTRUCTORS*/
	
	@CrossOrigin
	@RequestMapping("/instructor")
	Collection<Instructor> instructors() { 
		return instructorRepository.findAll();
	}
	@GetMapping(path = "/instructor/{instructorId}")
	Instructor one2(@PathVariable String instructorId) {
		return instructorRepository.findOne(instructorId);
	}
	
	@DeleteMapping("/instructor/{instructorId}")
	public ResponseEntity<?> deleteInstructor(@PathVariable String instructorId) { 
		Instructor ins = instructorRepository.findOne(instructorId);
		instructorRepository.delete(ins);
		return ResponseEntity.ok().build();
	}
	
	
	/* FOR STUDENTS*/
	
	@CrossOrigin
	@RequestMapping("/student")
	Collection<Student> students() { 
		return studentRepository.findAll();
	}
	@GetMapping(path = "/student/{studentId}")
	Student one3(@PathVariable String id) {
		return studentRepository.findOne(id);
	}
	
	@DeleteMapping("/student/{studentId}")
	public ResponseEntity<?> deleteStudent(@PathVariable String studentId) { 
		Student ins = studentRepository.findOne(studentId);
		studentRepository.delete(ins);
		return ResponseEntity.ok().build();
	}

}
