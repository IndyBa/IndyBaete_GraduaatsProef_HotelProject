package hotelproject.rest.models;

import java.time.LocalDate;

public class MemberInputDTO {
    private String name;
    private LocalDate birthDay;

    public MemberInputDTO(String name, LocalDate birthDay) {
        this.name = name;
        this.birthDay = birthDay;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }
    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }
}
