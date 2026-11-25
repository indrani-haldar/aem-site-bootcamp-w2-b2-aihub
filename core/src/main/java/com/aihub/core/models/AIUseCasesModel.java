package com.aihub.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
        adaptables = Resource.class,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class AIUseCasesModel {

    @ValueMapValue
    private String fragmentPath;

    @SlingObject
    private ResourceResolver resourceResolver;

    private String title;
    private String description;
    private String category;
    private String image;
    private String level;

    @PostConstruct
    protected void init() {
        if (fragmentPath == null || fragmentPath.isEmpty()) {
            return;
        }

        Resource cfResource = resourceResolver.getResource(
                fragmentPath + "/jcr:content/data/master");
        if (cfResource == null) {
            return;
        }

        ValueMap vm = cfResource.getValueMap();
        title = vm.get("title", "");
        description = vm.get("description", "");
        category = vm.get("category", "");
        image = vm.get("image", "");
        String fragmentLevel = vm.get("level", "");
        level = fragmentLevel.trim().isEmpty() ? "Intermediate" : fragmentLevel;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getImage() {
        return image;
    }

    public String getLevel() {
        return level;
    }
}
