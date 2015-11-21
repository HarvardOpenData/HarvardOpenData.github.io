Here's where we'll store our metadata schema.

Schemas to look into as inspiration:
- [https://project-open-data.cio.gov/v1.1/schema/](https://project-open-data.cio.gov/v1.1/schema/)
- [https://github.com/Harvard-Open-Data-Project/hodp/issues/6](https://github.com/Harvard-Open-Data-Project/hodp/issues/6)

Field | Label | Definition | Required
----- | ----- | ---------- | --------
title | Title | Human-readable name of the dataset. Should be in plain English and include sufficient detail to facilitate search and discovery. | yes
description | Description | Human-readable description (e.g., an abstract) with sufficient detail to enable a user to quickly understand whether the dataset is of interest. | no
tags | Tags/Keywords | Tags (or keywords) help users discover your dataset; please include terms that would be used by technical and non-technical users. | no
updated | Last Update | Most recent date on which the dataset was changed, updated or modified. | no
publisher | Publisher | The publishing entity and optionally their parent organization(s). | no
access | Access URL | URL providing indirect access to a dataset, for example via API or a graphical interface. | no
download | Download URL | URL providing direct access to a downloadable file of a dataset. | no
datatype | Data Type | format of the data set (e.g. csv, pdf, api, etc.) | no
permissions | Access Permissions | General public or Harvard affiliates only | no
license | License | The license or non-license (i.e. Public Domain) status with which the dataset or API has been published. | no
comments | Comments or Notes | Text supplying any additional relevant information on the dataset | no
