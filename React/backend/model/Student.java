package com.metehan.netas.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="studentId", unique=true, nullable=false)
	public String studentId;
	
	@Column(name="name",nullable=false)
	public String name;
	
	@Column(name="surname", nullable=false)
	public String surname;
	
	@Column(name="mobilePhone")
	public String mobilePhone;

	@Column(name="city")
	public String city;
	
	@Column(name="district")
	public String district;
	
	@Column(name="studentSchool")
	public String studentSchool;
	
	public Student() {
		
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String id) {
		this.studentId = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getStudentSchool() {
		return studentSchool;
	}

	public void setStudentSchool(String studentSchool) {
		this.studentSchool = studentSchool;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Student [id=" + studentId + ", name=" + name + ", surname=" + surname + ", mobilePhone=" + mobilePhone
				+ ", city=" + city + ", district=" + district + ", studentSchool=" + studentSchool + "]";
	}

	public Student(String id, String name, String surname, String mobilePhone, String city, String district,
			String studentSchool) {
		super();
		this.studentId = id;
		this.name = name;
		this.surname = surname;
		this.mobilePhone = mobilePhone;
		this.city = city;
		this.district = district;
		this.studentSchool = studentSchool;
	}
	
	
	
}
