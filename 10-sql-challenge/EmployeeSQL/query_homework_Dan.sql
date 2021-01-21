CREATE TABLE Employee (
    emp_no int   NOT NULL,
    emp_title_id varchar(255)   NOT NULL,
    birth_date timestamp   NOT NULL,
    first_name varchar(255)   NOT NULL,
    last_name varchar(255)   NOT NULL,
    sex varchar(10)   NOT NULL,
    hire_date timestamp   NOT NULL,
    CONSTRAINT pk_Employee PRIMARY KEY (
        emp_no
     )
);

CREATE TABLE departments (
    dept_no varchar(255)   NOT NULL,
    dept_name varchar(255)   NOT NULL,
    CONSTRAINT pk_departments PRIMARY KEY (
        dept_no
     )
);

CREATE TABLE salaries (
    emp_no int   NOT NULL,
    salary numeric   NOT NULL,
    CONSTRAINT pk_salaries PRIMARY KEY (
        emp_no
     )
);

CREATE TABLE titles (
    title_id varchar(255)   NOT NULL,
    title varchar(255)   NOT NULL,
    CONSTRAINT pk_titles PRIMARY KEY (
        title_id
     )
);

CREATE TABLE dept_emp (
    emp_no int   NOT NULL,
    dept_no varchar(255)   NOT NULL,
    CONSTRAINT pk_dept_emp PRIMARY KEY (
        emp_no,dept_no
     )
);

CREATE TABLE dept_manager (
    dept_no varchar(255)   NOT NULL,
    emp_no int   NOT NULL,
    CONSTRAINT pk_dept_manager PRIMARY KEY (
        dept_no,emp_no
     )
);

ALTER TABLE Employee ADD CONSTRAINT fk_Employee_emp_title_id FOREIGN KEY(emp_title_id)
REFERENCES titles (title_id);

ALTER TABLE salaries ADD CONSTRAINT fk_salaries_emp_no FOREIGN KEY(emp_no)
REFERENCES Employee (emp_no);

ALTER TABLE dept_emp ADD CONSTRAINT fk_dept_emp_emp_no FOREIGN KEY(emp_no)
REFERENCES Employee (emp_no);

ALTER TABLE dept_emp ADD CONSTRAINT fk_dept_emp_dept_no FOREIGN KEY(dept_no)
REFERENCES departments (dept_no);

ALTER TABLE dept_manager ADD CONSTRAINT fk_dept_manager_dept_no FOREIGN KEY(dept_no)
REFERENCES departments (dept_no);

ALTER TABLE dept_manager ADD CONSTRAINT fk_dept_manager_emp_no FOREIGN KEY(emp_no)
REFERENCES Employee (emp_no);


-- 1) List the following details of each employee: employee number, last name, first name, sex, and salary.
-- employ_number, last_name, first_name from employee table
-- salary from salaries table


select e.emp_no, e.last_name, e.first_name, s.salary
from employee e
join salaries s
on (e.emp_no = s.emp_no);


-- 2)List first name, last name, and hire date for employees who were hired in 1986.
select first_name, last_name, hire_date from employee
where hire_date >= '1986.01.01';


-- 3)List the manager of each department with the following information:
--   department number, department name, the manager's employee number, last name, first name.
--departments, dept_manager, employee
--dept_no emp_no -> dept_manager
--dept_no dept_name -> departments

select d.dept_no, d.dept_name, dm.emp_no, e.last_name, e.first_name 
from dept_manager dm
join departments d on (d.dept_no = dm.dept_no)
join employee e on (dm.emp_no = e.emp_no);


-- 4)List the department of each employee with the following information:
--   employee number, last name, first name, and department name.
-- dept_emp : emp_no , dept_no

select de.emp_no, e.last_name, e.first_name, d.dept_name
from dept_emp de
join departments d on (d.dept_no = de.dept_no)
join employee e on (de.emp_no = e.emp_no);

-- 5) List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
select first_name, last_name, sex from employee
where first_name = 'Hercules' and last_name like 'B%';

-- 6)List all employees in the Sales department, including their
--   employee number, last name, first name, and department name.

select e.emp_no, e.last_name, e.first_name, d.dept_name from employee e, departments d
where d.dept_name = 'Sales';


-- 7) List all employees in the Sales and Development departments, including their 
--    employee number, last name, first name, and department name.

select e.emp_no, e.last_name, e.first_name, d.dept_name from employee e, departments d
where d.dept_name = 'Sales'or d.dept_name = 'Development';

-- 8) In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

select last_name, count(last_name) as "count last name" from employee
group by last_name
order by "count last name" desc;


-- Bonus(Optional)

