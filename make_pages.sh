#!/bin/bash

function page_for_class {
    sed "s/{NUMBER}/$1/g" course_template.html | sed "s/{LETTER}/$2/g" > "$1$2.html"
}

page_for_class "20" ""

page_for_class "32" "A"
page_for_class "32" "B"

page_for_class "34" ""

page_for_class "36" "A"
page_for_class "36" "B"
page_for_class "36" "C"

page_for_class "50" ""

page_for_class "120" ""

page_for_class "122" "A"
page_for_class "122" "B"

page_for_class "132" ""

page_for_class "140" "A"

page_for_class "150" ""

page_for_class "152" "A"

page_for_class "153" ""

page_for_class "154" "B"

page_for_class "162" ""
page_for_class "174" ""
page_for_class "178" ""
page_for_class "188" ""
