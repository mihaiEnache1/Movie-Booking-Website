package com.project.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer capacity;
    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<Show> shows;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;
}
