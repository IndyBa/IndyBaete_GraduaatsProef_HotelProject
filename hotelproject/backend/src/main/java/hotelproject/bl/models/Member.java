package hotelproject.bl.models;

import hotelproject.bl.exceptions.MemberException;

import java.time.LocalDate;
import java.util.Objects;

public class Member {
    private long id;
    private String name;
    private LocalDate birthDay;
    private boolean status;

    public Member(long id, String name, LocalDate birthDay) throws MemberException {
        setId(id);
        setName(name);
        setBirthDay(birthDay);
        setStatus(true);
    }

    public Member(String name, LocalDate birthDay) throws MemberException {
        setName(name);
        setBirthDay(birthDay);
        setStatus(true);
    }

    public long getId() {
        return id;
    }
    public void setId(long id) throws MemberException {
        if (id <= 0) {
            throw new MemberException("Invalid ID");
        }
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) throws MemberException {
        if (name == null || name.trim().isEmpty()) {
            throw new MemberException("Name is empty");
        }
        this.name = name;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }
    public void setBirthDay(LocalDate birthDay) throws MemberException {
        if (birthDay.isAfter(LocalDate.now())) {
            throw new MemberException("Birthday is invalid");
        }
        this.birthDay = birthDay;
    }

    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Member member = (Member) obj;

        if (id != member.id) return false;
        if (!name.equals(member.name)) return false;
        return birthDay.equals(member.birthDay);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, birthDay);
    }
}
