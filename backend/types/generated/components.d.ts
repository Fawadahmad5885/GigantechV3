import type { Schema, Struct } from '@strapi/strapi';

export interface CaseStudiesDescription extends Struct.ComponentSchema {
  collectionName: 'components_case_studies_descriptions';
  info: {
    description: '';
    displayName: 'Description';
  };
  attributes: {
    dStatus: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    region: Schema.Attribute.String;
    technologies: Schema.Attribute.String;
  };
}

export interface CommonSeactionHeader extends Struct.ComponentSchema {
  collectionName: 'components_common_seaction_headers';
  info: {
    description: '';
    displayName: 'section-header';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    CardButton: Schema.Attribute.Component<'elements.primary-button', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsCarousel extends Struct.ComponentSchema {
  collectionName: 'components_elements_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsClientCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_client_cards';
  info: {
    displayName: 'Client Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    clientLogo: Schema.Attribute.Media<'images' | 'files'>;
    url: Schema.Attribute.String;
  };
}

export interface ElementsForm extends Struct.ComponentSchema {
  collectionName: 'components_elements_forms';
  info: {
    description: '';
    displayName: 'Form';
  };
  attributes: {
    Input: Schema.Attribute.Component<'elements.input', true>;
    inputOptions: Schema.Attribute.Component<'elements.input-options', true>;
    serviceTitles: Schema.Attribute.Component<'elements.services-title', true>;
  };
}

export interface ElementsInput extends Struct.ComponentSchema {
  collectionName: 'components_elements_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsInputOptions extends Struct.ComponentSchema {
  collectionName: 'components_elements_input_options';
  info: {
    description: '';
    displayName: 'about Us Items';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface ElementsNavigationItems extends Struct.ComponentSchema {
  collectionName: 'components_elements_navigation_items';
  info: {
    description: '';
    displayName: 'NavigationItems';
  };
  attributes: {
    Label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    linkType: Schema.Attribute.Enumeration<['section', 'page']> &
      Schema.Attribute.Required;
    SectionId: Schema.Attribute.Text;
  };
}

export interface ElementsOfficesCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_offices_cards';
  info: {
    displayName: 'Offices Card';
  };
  attributes: {
    flagImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    mapUrl: Schema.Attribute.Text;
    mobileNumber: Schema.Attribute.String & Schema.Attribute.Required;
    subHeading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPrimaryButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_primary_buttons';
  info: {
    description: '';
    displayName: 'Primary Button';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsServicesTitle extends Struct.ComponentSchema {
  collectionName: 'components_elements_services_titles';
  info: {
    description: '';
    displayName: 'services Title';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_tech_cards';
  info: {
    description: '';
    displayName: 'Tech Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    tooltip: Schema.Attribute.String;
  };
}

export interface ElementsTechnology extends Struct.ComponentSchema {
  collectionName: 'components_elements_technologies';
  info: {
    displayName: 'Technology';
  };
  attributes: {
    technologyTechCard: Schema.Attribute.Component<'elements.tech-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    description: '';
    displayName: 'Meta Data';
  };
  attributes: {
    keyWords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    openGraphImage: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface TextsFooterSteps extends Struct.ComponentSchema {
  collectionName: 'components_texts_footer_steps';
  info: {
    displayName: 'Footer Steps';
  };
  attributes: {
    firstStep: Schema.Attribute.Text & Schema.Attribute.Required;
    secondStep: Schema.Attribute.Text & Schema.Attribute.Required;
    thirdStep: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TextsParagraphs extends Struct.ComponentSchema {
  collectionName: 'components_texts_paragraphs_s';
  info: {
    description: '';
    displayName: 'Paragraphs ';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

export interface TextsSectionBlock extends Struct.ComponentSchema {
  collectionName: 'components_texts_section_blocks';
  info: {
    description: '';
    displayName: 'Section Block';
  };
  attributes: {
    sectionParagraphs: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    subSections: Schema.Attribute.Component<'texts.text-desc', true>;
  };
}

export interface TextsServicesShortTitles extends Struct.ComponentSchema {
  collectionName: 'components_texts_services_short_titles';
  info: {
    displayName: 'Services Short Titles';
  };
  attributes: {
    shortTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TextsStyledText extends Struct.ComponentSchema {
  collectionName: 'components_texts_styled_texts';
  info: {
    displayName: 'StyledText';
  };
  attributes: {
    highLighted: Schema.Attribute.String;
    postText: Schema.Attribute.Text;
    preText: Schema.Attribute.Text;
  };
}

export interface TextsTagItem extends Struct.ComponentSchema {
  collectionName: 'components_texts_tag_items';
  info: {
    displayName: 'tagItem';
  };
  attributes: {
    tag: Schema.Attribute.String;
  };
}

export interface TextsTextDesc extends Struct.ComponentSchema {
  collectionName: 'components_texts_text_descs';
  info: {
    description: '';
    displayName: 'Text Desc';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['bullet', 'miniCard']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'case-studies.description': CaseStudiesDescription;
      'common.seaction-header': CommonSeactionHeader;
      'elements.card': ElementsCard;
      'elements.carousel': ElementsCarousel;
      'elements.client-card': ElementsClientCard;
      'elements.form': ElementsForm;
      'elements.input': ElementsInput;
      'elements.input-options': ElementsInputOptions;
      'elements.navigation-items': ElementsNavigationItems;
      'elements.offices-card': ElementsOfficesCard;
      'elements.primary-button': ElementsPrimaryButton;
      'elements.services-title': ElementsServicesTitle;
      'elements.tech-card': ElementsTechCard;
      'elements.technology': ElementsTechnology;
      'seo.meta-data': SeoMetaData;
      'texts.footer-steps': TextsFooterSteps;
      'texts.paragraphs': TextsParagraphs;
      'texts.section-block': TextsSectionBlock;
      'texts.services-short-titles': TextsServicesShortTitles;
      'texts.styled-text': TextsStyledText;
      'texts.tag-item': TextsTagItem;
      'texts.text-desc': TextsTextDesc;
    }
  }
}
