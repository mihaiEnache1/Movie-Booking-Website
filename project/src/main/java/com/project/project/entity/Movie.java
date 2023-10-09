package com.project.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String genre;
    private String duration;
    @Column(length = 1000)
    private String description;
    private String language;
    private Double rating;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Show> shows;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Booking> bookings;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "movie_images",
        joinColumns = {
            @JoinColumn(name = "movie_id")
        }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
            }
    )
    private Set<ImageModel> movieImages;
    private Double price;
    private String trailerVideoId;

    public void setImages(Set<ImageModel> images) {
        this.movieImages = images;
    }
}
