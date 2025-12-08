package com.example.E_commerceMiniStore.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    // ✅ Add this field
    @Column(nullable = false)
    private String category;

    public Product() {}

    public Product(String name, String description, BigDecimal price, Integer quantity, String category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
/*
 * lombok
 * java library that helps to reduce boilerplate code
 * like getters, setters, constructors, toString, hashCode, equals, etc.
 * It uses annotations to generate the code at compile time.
 * 
 * 
 * public class user {
 *   private String name;
 *  private String age;
 * public user() {}
 * 
 * public user(String name, String age) {
 * this.name = name;
 * this.age = age;
 * 
 * }
 * public String getName() { return name; }
 * public void setName(String name) { this.name = name; }
 * public String getAge() { return age; }
 * public void setAge(String age) { this.age = age; }
 * 
 * @override
 * public String toString() {
 * return "user [name=" + name + ", age=" + age + "]";
 * }
 * @override
 * public boolean equals(Object obj) {
 * if (this == obj) return true;
 *  if (obj == null || getClass() != obj.getClass()) return false;
 * user other = (user) obj;
 * 
 * 
 * ` return Objects.equals(name, other.name) && Objects.equals(age, other.age); `
 * 
 * }
 * @override
 * public int hashCode() {
 * return Objects.hash(name, age);
 * }

 */

/*
 * with lombok
 * import lombok.AllArgsConstructor;
 * import lombok.Data;  
 * import lombok.NoArgsConstructor;

    @data // it will generate getters, setters, toString, hashCode, equals
    * @NoArgsConstructor // it will generate no-args constructor
    * @AllArgsConstructor // it will generate all-args constructor

    class user {
    private String name;
    private String age;
    }   
 */

 /*
 all lombok annotations
@Data // Generates getters, setters, toString, hashCode, equals
@getter // Generates getters for all fields
@setter // Generates setters for all fields
@ToString // Generates a toString method
@EqualsAndHashCode // Generates hashCode and equals methods
@NoArgsConstructor // Generates a no-argument constructor
@AllArgsConstructor // Generates an all-argument constructor
@RequiredArgsConstructor // Generates a constructor for final fields
@Builder // Implements the builder pattern
@Value // Makes the class immutable and generates getters, toString, hashCode, equals
@Log // Generates a logger field
@Log4j // Generates a Log4j logger field
@Log4j2 // Generates a Log4j2 logger field
@CommonsLog // Generates a Commons Logging logger field
@Sl4j // Generates a SLF4J logger field
@XSlf4j // Generates an XSLF4J logger field
@Flogger // Generates a Flogger logger field
@Synchronized // Generates synchronized methods
@Cleanup // Automatically cleans up resources
@SneakyThrows // Allows throwing checked exceptions without declaring them
  */
/* emplyee emp = new employee.Builder();
    .name("john")
    .age(30)
    .address("123 street")
    .build();

    */
    // @Builder
    // public static class Employee {
    //     private String name;
    //     private int age;
    //     private String address;

    //     // Getters
    //     public String getName() { return name; }
    //     public int getAge() { return age; }
    //     public String getAddress() { return address; }
    // }

/* 
without builder pattern
    private Employee (Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.address = builder.address;
    }
    public static class Builder {
        private String name;
        private int age;
        private String address;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Employee build() {
            return new Employee(this);
        }
    }
    employee emp = new employee();
    emp.setName("john");
    emp.setAge(30);
    emp.setAddress("123 street");
    */