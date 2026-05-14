package mate.academy.backend.controller;

import java.util.Set;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.model.GiftAudience;
import mate.academy.backend.model.GiftSort;
import mate.academy.backend.service.GiftService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/gifts")
public class GiftController {
    private final GiftService giftService;

    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @GetMapping
    public Page<GiftDto> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer priceMinCents,
            @RequestParam(required = false) Integer priceMaxCents,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Set<GiftAudience> targetAudience,
            @RequestParam(required = false) Set<String> tags,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(defaultValue = "NEWEST") GiftSort sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return giftService.search(q, priceMinCents, priceMaxCents, age, targetAudience, tags, inStock,
                sort,
                page,
                size);
    }

    @GetMapping("/{id}")
    public GiftDto getById(@PathVariable Long id) {
        return giftService.getById(id);
    }
}

