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
public class AIToolCardModel {

    @ValueMapValue
    private String fragmentPath;

    @SlingObject
    private ResourceResolver resourceResolver;

    private String id;
    private String category;
    private String description;
    private String title;
    private String image;

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
        id = vm.get("id", "");
        title = vm.get("title", "");
        description = vm.get("description", "");
        category = vm.get("category", "");
        image = vm.get("image", "");
    }

    public String getFragmentPath() {
        return fragmentPath;
    }

    public String getId() {
        return id;
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
}