package com.project.project.controller;

import com.project.project.entity.ImageModel;
import com.project.project.entity.Movie;
import com.project.project.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = "/addMovie", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Movie addNewMovie(@RequestPart("movie") Movie movie, @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> images = uploadImage(file);
            movie.setImages(images);
            return movieService.addNewMovie(movie);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/getMovies")
    public List<Movie> getAllMovies(@RequestParam(defaultValue = "0") int pageNumber,@RequestParam(defaultValue = "") String searchKey) {
        return movieService.getMovies(pageNumber, searchKey);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/getAllMovies")
    public List<Movie> getMovies() {
        return movieService.getMovieList();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteMovie/{id}")
    public void deleteMovie(@PathVariable("id") Long id) {
        movieService.deleteMovie(id);
    }

    @GetMapping("/getMovieById/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = "/updateMovie", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Movie updateMovie(@RequestPart("movie") Movie updatedMovie, @RequestPart("imageFile") MultipartFile[] file) {
        try {
            // Fetch the existing Movie entity from the database using ID
            Movie existingMovie = movieService.getMovieById(updatedMovie.getId());

            // Apply the changes from the updatedMovie to the existingMovie
            existingMovie.setTitle(updatedMovie.getTitle());
            existingMovie.setGenre(updatedMovie.getGenre());
            existingMovie.setDuration(updatedMovie.getDuration());
            existingMovie.setDescription(updatedMovie.getDescription());
            existingMovie.setLanguage(updatedMovie.getLanguage());
            existingMovie.setRating(updatedMovie.getRating());
            existingMovie.setPrice(updatedMovie.getPrice());
            // ... update other properties

            // Update the images
            Set<ImageModel> images = uploadImage(file);
            existingMovie.setImages(images);

            // Save the updated Movie entity
            return movieService.updateMovie(existingMovie);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }
        return imageModels;
    }
}
