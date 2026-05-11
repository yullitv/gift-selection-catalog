package mate.academy.backend.controller;

import java.util.Set;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.service.GiftService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gifts")
public class GiftController {
    private final GiftService giftService;

    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @GetMapping
    public java.util.List<GiftDto> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer priceMinCents,
            @RequestParam(required = false) Integer priceMaxCents,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Set<String> tags
    ) {
        return giftService.search(q, priceMinCents, priceMaxCents, age, tags);
    }

    @GetMapping("/{id}")
    public GiftDto getById(@PathVariable Long id) {
        return giftService.getById(id);
    }
}

