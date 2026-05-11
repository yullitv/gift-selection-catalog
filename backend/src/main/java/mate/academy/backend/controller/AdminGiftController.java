package mate.academy.backend.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.dto.GiftUpsertRequest;
import mate.academy.backend.service.GiftService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/gifts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminGiftController {
    private final GiftService giftService;

    public AdminGiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @PostMapping
    public GiftDto create(@Valid @RequestBody GiftUpsertRequest req) {
        return giftService.create(req);
    }

    @PutMapping("/{id}")
    public GiftDto update(@PathVariable Long id, @Valid @RequestBody GiftUpsertRequest req) {
        return giftService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        giftService.delete(id);
    }
}

