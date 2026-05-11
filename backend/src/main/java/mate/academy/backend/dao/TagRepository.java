package mate.academy.backend.dao;

import java.util.Optional;
import java.util.UUID;
import mate.academy.backend.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}

