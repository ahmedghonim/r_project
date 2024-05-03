"use client";
import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RemarkFC from "@/components/ui/remarker";
import Burger from "@/svg/burger.svg";
import Close from "@/svg/close.svg";
const GuidePage = () => {
  const [open, setOpen] = useState(true);
  const doc = `# Conversions guide
---

[https://github.com/souvikinator/notion-to-md](https://github.com/souvikinator/notion-to-md)

---

---

# 1. Mean and standard deviation (SD) conversions

In just one click, all the below data types (for one group or more) will be converted to mean and SD, then automatically will convert mean and SD pre- (baseline) and post-treatment to mean and SD change.
N.B: Correlation coefficient is calculated if available or estimated if not.

## 1. Mean and standard deviation (SD) change

If you want to estimate the change in mean (x̄) and standard deviation (σ) from baseline, define the following values:

1) Mean (x̄) (baseline)

2) Mean (x̄) post-treatment (Final)

3) Standard deviation (σ) (baseline)

4) Standard deviation (σ) (Final)

5) Correlation coefficient (C.C)

- Firstly, calculate C.C if the data presented contains the following:

1) Standard deviation(σ)(Baseline)

2) Standard deviation(σ)(Final)

3) Standard deviation (σ) (Change)

| Inputs |  |  |
| --- | --- | --- |
| σ (Baseline) | σ (Final) | σ (Change) |
|  |  |  |
|  |  |  |
|  |  |  |

The output (C.C)  was calculated upon the following equation:

$$
  \mathrm{Corr}{\mathrm{E}}=\frac{\mathrm{SD}{\text { baseline}}^{2}+\mathrm{SD}{\mathrm{} \text { final}}^{2}-\mathrm{SD}{\mathrm{} \text { change}}^{2}}{2 \times \mathrm{SD}{\text { baseline}} \times \mathrm{SD}{\mathrm{} \text { final }}} 
$$

Then put the available data into the corresponding cell of the Inputs >> click calculate >> you’ll get the data represented by a change in mean and standard deviation in the Output squares

جداول

The outputs was calculated upon the following equations:

**A) Mean (x̄) change** ≈ x̄ (Final) - x̄ (Baseline)

**B) Standard deviation (σ) change:  σ**

$$
  \mathrm{SD}{\mathrm{} \text { change }}=\sqrt{\mathrm{SD}{\text { baseline}}^{2}+\mathrm{SD}{\mathrm{} \text { final}}^{2}-\left(2 \times \mathrm{Corr} \times \mathrm{SD}{\text { baseline}} \times \mathrm{SD }{\mathrm{ } \text { final}}\right)} 
$$

---

## 2. Mean and confidence interval (CI)

If you want to estimate mean (x̄)and standard deviation (σ) from mean (x̄) & Confidence intervals, define the following values:

1) Mean (**x̄**)

2) Upper limit

3) Lower limit

4) Sample size in each group (N)

Put each of which into the corresponding cell of the Inputs >> click calculate >> you’ll get the data presented by mean and standard deviation in the Outputs squares

جداول

The outputs will be calculated upon the following equations:

$$
  \mathrm{SD}=\sqrt{\mathrm{N}} \times \frac{Upper Limit - Lower Limit }{3.92}
$$

---

## 3. Mean and standard error (SE)

If you want to estimate standard deviation (σ) from Standard Error (SE), define the following values:

1) Standard Error

2) Sample size in each group (N)

Put each of which into the corresponding cell of the Inputs >> click calculate >> you’ll get the data presented by mean and standard deviation in the Output squares

جداول

The outputs will be calculated upon the following equation:

$$
  S D=S E \times \sqrt{N} 
$$

---

## 4. Median and range

If you want to estimate mean (x̄)and standard deviation (σ) from median (m)& Range (R), define the following values:

1) Median (m)

2) The smallest value (a)

3) The largest value (b)

4) Sample size in each group (n)

Put each of which into the corresponding cell of the Inputs >> click calculate >> you’ll get the data presented by mean and standard deviation in the Outputs squares

جداول

The outputs will be calculated upon the following equations:

**A) Mean (x̄)** ≈ ((a+2m+b) /4) + ((a-2m+b) /4)

If the sample size was fairly large it can be calculated according to only:

**Mean (x̄)** ≈ ((a+2m+b) /4)

**B) Standard deviation (σ):       
If n< 15:                 σ** ≈ R/4 ≈ b-a/ √12

**If 15 <n< 60:         σ** ≈ R/4 ≈ b-a/4

If n>60:                  σ ≈ R/6 ≈ b-a/6

---

## 5. Median and inter quartile range (IQR)

If you want to estimate mean (x̄) and standard deviation (σ) from median (m) & Inter-Quartile Range (IQR), define the following values:

1. Median (m)
2. First Quartile (Q1)
3. Third Quartile (Q3)
4. Sample size in each group (n)

Put each of which into the corresponding cell of the Inputs >> click calculate >>
you’ll get the data presented by mean and standard deviation in the Output squares

جداول

The outputs will be calculated upon the following equations:

**Mean (x̄)** ≈ ((Q1+m+Q3)/3)

**Standard deviation (σ):** 

**If data presented as:** 

            **1) mean and (Q1, Q3):** 

**σ** ≈ ((Q3-Q1) / ((2*z^(-1))(0.75n-0.125/n+0.25))) ****

**Approximately σ** ≈ (Q3-Q1/1.35) **** where z is a constant symbol 

          **2) mean and (IQR):** 

**σ** ≈ (IQR/1.35)

---

## 6. A p-value of the difference between groups

If you want to estimate standard deviation (σ) from P-value between two groups,
define the following values:
a) P-value (between two groups)
b) Sample size of Experimental group (Ne)
c) Sample size of Control group (Nc)
d) Difference in means (two groups)

جداول 

1) Put P- value, (Ne) and (Nc) into the corresponding cell of Input 1 >> Output 1 (t-value)

2) Put the difference in means into the corresponding cell in the Input 2 >> Standard Error(SE)

Note:

*Once you add Ne, Nc, t-value, and SE, they’ll be directly transported into their other similar cells

The final output will be the Standard deviation (σ) for both groups

The output will be calculated upon the following equations: 

$$
S E=\frac{M D}{t} 
$$

Then:

$$
\mathrm{SE}= \frac{Upper Limit - Lower Limit }{3.92}
$$

---

## 7. Standard error (SE) of the difference between groups

If you want to estimate the standard deviation (σ) from Standard Error (SE) between two groups,

define the following values:

a) Standard Error between two groups

b) Sample size of Experimental group (Ne)

c) Sample size of Control group (Nc)

Put each of which into the corresponding cell of the Inputs >> click calculate >> you’ll get the standard deviation for both groups in the Outputs squares

جداول 

The output was calculated upon the following equation:

$$
S D=\frac{S E}{\sqrt{\frac{1}{N_{E}}+\frac{1}{N_{C}}}} 
$$

---

## 8. Confidence interval (CI) of the difference between groups

If you want to estimate standard deviation (σ) from Confidence Intervals

between two groups, define the following values:

a) Upper limit

b) Lower limit

c) Sample size of Experimental group (Ne)

d) Sample size of Control group (Nc)

e) % CIs used (Usually 95% CI)

جداول 

1) Put Upper limit, Ne and Nc into the corresponding cell of Input 1 >> Output 1 (SE)

* Note:

Once you add Ne, Nc and Calculate SE in output 1 >> these data will be transported

into the corresponding cells of the output 2

Finally, you’ll get the standard deviation(σ) for both groups in the Outputs squares

The Output will be calculated upon the following equations:

$$
\mathrm{SE}= \frac{Upper Limit - Lower Limit }{3.92}
$$

Then:

$$
S D=\frac{S E}{\sqrt{\frac{1}{N_{E}}+\frac{1}{N_{C}}}} 
$$

---

## 9. Percent change from baseline

If the study reported only percent change from baseline like [the mean percent change in peak esophageal intraepithelial eosinophil count from baseline was –88·9% (95% CI –93·8 to –84·1)]. Using our calculator, you can convert it to mean change from baseline (the absolute value of percent change) and standard deviation (SD).

**First of all, the percent change is divided into two types:**

1. Percentage decrease or reduction: the most common type and most of the studies that report the effect size in percent change, it will be decrease or reduction type.
2. Percentage increase: less common

**How can you differentiate between them??**

If the outcome should be **decreased** by the intervention like **pain** or the example that we mentioned before the **percentage** will be **reduction** type. However, if the outcome should be **increased** by the intervention like **acetylcholine** in case of myasthenia graves. It should be **increased** by Acetylcholinesterase Inhibitors. In this case, the percentage will be a **percentage increase**.

**How can you calculate??**

1. **Percentage reduction**

$$
\text {Percentage reduction } =\frac{\text { baseline value }- \text { final value }}{\text { baseline value }} 
$$

Final = baseline value – baseline value × percentage

Now you have baseline and final values you can calculate absolute change easily.

1. **Percentage increase**
    
    $$
    \text {Percentage increase}  =\frac{\text { final value }- \text { baseline value }}{\text { baseline value }} 
    $$
    

Final = baseline value + baseline value × percentage

Now you have baseline and final values you can calculate absolute change easily.

- ** You will do these steps to the confidence interval then convert it to SD. Now you have the SD before and after and you can calculate the change.
- ****Don’t forget to put the percentage in this form (0.95) not in this form (95%)**

---

---

# 2. Effect size estimation

## 1. Prevalence (proportions) meta-analysis

مش مكتوبة لسه

---

## 2. Dichotomous data pooling (for indirect meta-analysis)

Example:

|  | Interventions A |  | Control |  |
| --- | --- | --- | --- | --- |
| ID | Event | Total | Event | Total |
| Study 1 |  |  |  |  |
| Study 2 |  |  |  |  |
| Study 3 |  |  |  |  |

|  | Interventions B |  | Control |  |
| --- | --- | --- | --- | --- |
| ID | Event | Total | Event | Total |
| Study 1 |  |  |  |  |
| Study 2 |  |  |  |  |
| Study 3 |  |  |  |  |

If you want to compare between intervention A and intervention B you need to calculate the logarithm of treatment effect (log TE) (log RR or log OR) and the Standard error of logarithm treatment effect (SE-logTE).

Our calculator can calculate logarithm treatment effect (log RR or log OR) and Standard error of logarithm treatment effect (SE-log RR or SE-log OR).

- **Risk ratio:**

$$
  \mathrm{RR}=\frac{\text { event } I}{\text { total I }} \div \frac{\text { event } C}{\text { total } C} 
$$

  I represent intervention, C represents control

Log RR = log (RR)

$$
  \operatorname{Var}_{\log \mathrm{RR}}=\frac{1}{\text { event I }}-\frac{1}{\text { total I }}+\frac{1}{\text { event } C}-\frac{1}{\text { total } C} 
$$

$$
  SE_{\text {Var } \log R R}=\sqrt{\operatorname{Var} \log R R} 
$$

- **Odds ratio:**

$$
\mathrm{OR}=\frac{\text { event } I \times \text { nonevent } C}{\text { event } C \times \text { nonevent } I} 
$$

I represent intervention, C represents control

Log OR = log (OR)

$$
  \operatorname{Var}_{\log \mathrm{OR}}=\frac{1}{\text { event } I}+\frac{1}{\text { nonevent } \mathrm{I}}+\frac{1}{\text { event } C}+\frac{1}{\text { nonevent } C} 
$$

$$
  \mathrm{SE}_{\text {Var } \log \mathrm{OR}}=\sqrt{\operatorname{Var} \log \mathrm{OR}} 
$$

---

## 3. Continuous data pooling (for indirect meta-analysis)

Example:

|  | Interventions A |  |  | Control |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| ID | Mean | SD | Total | Mean | SD | Total |
| Study 1 |  |  |  |  |  |  |
| Study 2 |  |  |  |  |  |  |
| Study 3 |  |  |  |  |  |  |

|  | Interventions B |  |  | Control |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| ID | Mean | SD | Total | Mean | SD | Total |
| Study 1 |  |  |  |  |  |  |
| Study 2 |  |  |  |  |  |  |
| Study 3 |  |  |  |  |  |  |

If you want to compare intervention A and intervention B you need to calculate treatment effect (TE) (mean difference between intervention and control) and Standard error of treatment effect (SE-TE).

Our calculator can calculate treatment effect (TE) (mean difference between intervention and control) and Standard error of treatment effect (SE-TE).

Computing TE from studies that use independent groups We can estimate the mean difference (TE) from a study that use mean for two independent groups as follows.

TE = mean for intervention – mean for control

SD1 and SD2 will be the standard deviation of the two groups. N1 and N2 will be the sample size of the two groups. 

In the case of homogenous data (if we use a fixed effect model), we assume the two standard deviations are equal.

So we can calculate the variance of TE as follows: 

$$
  \operatorname{Var}=\frac{N 1+N 2}{N 1 * N 2} S D^{2} 
$$

SD2 represents the pooled standard deviation of the two groups. Var represent variance

$$
  S D^{2}=\sqrt{\frac{(N 1-1) S D^{2}+(N 2-1) S D^{2}}{N 1+N 2-2}} 
$$

$$
  \mathrm{SE}-\mathrm{TE}=\sqrt{v a r} 
$$

In the case of heterogeneous data (if we use a random effect model), we don’t assume the two standard deviations are equal.

$$
Var  =\frac{S D 1^{2}}{N 1}+\frac{S D 2^{2}}{N 2} 
$$

$$
  \mathrm{SE}-\mathrm{TE}=\sqrt{v a r} 
$$

---

---

# 3. Mean and standard deviation (SD) calculation

## From data for each patient into a single mean and SD

### **Needed values**

If you want to estimate mean (x̄) and standard deviation (σ) from data presented Individually for each patient, define the following values:

1) Determine whether data is (sample or population)

2) Select data for each patient and put it manually in the bracket e.g (d1, d2, d3, d4, d5, d6, ….., etc) >> click calculate >> you’ll get the data presented by mean and standard deviation in the Output square

### Steps

1) Put each of the previous values into the corresponding cell of the Inputs 
2) Click calculate 
3) In the Output cells: you will get the combined mean and standard deviation

### **Equations**

The output was calculated upon the following equations: 

1) Mean (x̄) = n/N

Where:

n: is the total sum of values and

N:  is the total number of values

$$
\sigma=\sqrt{\frac{1}{N} \sum_{i=1}^{N}\left(x_{i}-\mu\right)^{2}} 
$$

$$
  s=\sqrt{\frac{1}{N-1} \sum_{i=1}^{N}\left(x_{i}-\bar{x}\right)^{2}} 
$$

Where:

**xi:** is an individual value

**μ:** is the mean/expected value

**N:** is the total number of values

### Citation and equations source

Higgins JPT, Thomas J, Chandler J, Cumpston M, Li T, Page MJ, Welch VA (editors). *Cochrane Handbook for Systematic Reviews of Interventions* version 6.4 (updated August 2023). Cochrane, 2023. Available from www.training.cochrane.org/handbook.

(Chapter: ….)

---

---

# 4. Mean and standard deviation (SD) combination

## From two or more groups into a single mean and SD

### **Needed values**

To combine the mean and standard deviation of two or more groups into a single group mean and standard deviation, you need to define the following values:

1) Sample size (N) of each group 

2) Mean (M) of each group

3) Standard deviation (SD) of each group

### Steps

1) Put each of the previous values into the corresponding cell of the Inputs 
2) Click calculate 
3) In the Output cells: you will get the combined mean and standard deviation

### **Equations**

The output was calculated upon the following equations: 

1) Sample size combination: N1 + N2

2) Mean Combination: 

$$
\frac{N_{1} M_{1}+N_{2} M_{2}}{N_{1}+N_{2}}
$$

3) Standard deviation combination: 

$$
\sqrt{\frac{\left(N_{1}-1\right) S D_{1}^{2}+\left(N_{2}-1\right) S D_{2}^{2}+\frac{N_{1} N_{2}}{N_{1}+N_{2}}\left(M_{1}^{2}+M_{2}^{2}-2 M_{1} M_{2}\right)}{N_{1}+N_{2}-1}}
$$

### Citation and equations source

Higgins JPT, Thomas J, Chandler J, Cumpston M, Li T, Page MJ, Welch VA (editors). *Cochrane Handbook for Systematic Reviews of Interventions* version 6.4 (updated August 2023). Cochrane, 2023. Available from www.training.cochrane.org/handbook.

(Chapter: 6.5.2.10 Combining groups)

---

---

# 5. **Units of measure (lab) conversions**

## From one unit to another

A) To convert the laboratories results from an unit to another one, you need the following: 
- Choose the substance from the available list

B) The output will be calculated upon the following equations (with the list of available substances arranged alphabetically):

  

| Labs | Conversion | Ratio (equation) |
| --- | --- | --- |
| Acetaminophen | from µg/mL to µmol/L | 6.62 |
| Acetaminophen | from µmol/L to µg/mL | 0.151057402 |
| Acetoacetic acid | from mg/dL to mmol/L | 0.098 |
| Acetoacetic acid | from mmol/L to mg/dL | 10.20408163 |
| Acetone | from mg/dL to mmol/L | 0.172 |
| Acetone | from mmol/L to mg/dL | 5.813953488 |
| Alanine | from mg/dL to µmol/L | 112.2 |
| Alanine | from µmol/L to mg/dL | 0.008912656 |
| Albumin | from g/L to g/dL | 0.1 |
| Albumin | from g/dL to g/L | 10 |
| Aldosterone | from ng/dL to nmol/L | 0.0277 |
| Aldosterone | from nmol/L to ng/dL | 36.10108303 |
| Aluminum | from ng/mL to µmol/L | 0.0371 |
| Aluminum | from µmol/L to ng/mL | 26.9541779 |
| Aminobutyric acid | from mg/dL to µmol/L | 97 |
| Aminobutyric acid | from µmol/L to mg/dL | 0.010309278 |
| Amitriptyline | from ng/mL to nmol/L | 3.61 |
| Amitriptyline | from nmol/L to ng/mL | 0.27700831 |
| Ammonia (as NH3) | from µg/dL to µmol/L | 0.587 |
| Ammonia (as NH3) | from µmol/L to µg/dL | 1.703577513 |
| Androstenedione | from ng/dL to nmol/L | 0.0349 |
| Androstenedione | from nmol/L to ng/dL | 28.65329513 |
| Angiotensin I | from pg/mL to pmol/L | 0.772 |
| Angiotensin I | from pmol/L to pg/mL | 1.295336788 |
| Angiotensin II | from pg/mL to pmol/L | 0.957 |
| Angiotensin II | from pmol/L to pg/mL | 1.044932079 |
| Anion gap | from mEq/L to mmol/L | 1 |
| Anion gap | from mmol/L to mEq/L | 1 |
| Antidiuretic hormone | from pg/mL to pmol/L | 0.923 |
| Antidiuretic hormone | from pmol/L to pg/mL | 1.083423619 |
| Antithrombin III | from mg/L to mg/dL | 0.1 |
| Antithrombin III | from mg/dL to mg/L | 10 |
| Apolipoprotein A | from g/L to mg/dL | 100 |
| Apolipoprotein A | from mg/dL to g/L | 0.01 |
| Apolipoprotein B | from g/L to mg/dL | 100 |
| Apolipoprotein B | from mg/dL to g/L | 0.01 |
| Arginine | from mg/dL to µmol/L | 57.4 |
| Arginine | from µmol/L to mg/dL | 0.017421603 |
| Asparagine | from mg/dL to µmol/L | 75.7 |
| Asparagine | from µmol/L to mg/dL | 0.01321004 |
| Bicarbonate | from mEq/L to mmol/L | 1 |
| Bicarbonate | from mmol/L to mEq/L | 1 |
| Bilirubin | from mg/dL to µmol/L | 17.1 |
| Bilirubin | from µmol/L to mg/dL | 0.058479532 |
| Bromide | from mg/dL to mmol/L | 0.125 |
| Bromide | from mmol/L to mg/dL | 8 |
| C-peptide | from ng/mL to nmol/L | 0.333 |
| C-peptide | from nmol/L to ng/mL | 3.003003003 |
| C1 esterase inhibitor | from mg/L to mg/dL | 0.1 |
| C1 esterase inhibitor | from mg/dL to mg/L | 10 |
| C3 complement | from g/L to mg/dL | 100 |
| C3 complement | from mg/dL to g/L | 0.01 |
| C4 complement | from g/L to mg/dL | 100 |
| C4 complement | from mg/dL to g/L | 0.01 |
| Calcitonin | from ng/L to pg/mL | 1 |
| Calcitonin | from pg/mL to ng/L | 1 |
| Calcium | from mg/dL to mmol/L | 0.25 |
| Calcium | from mmol/L to mg/dL | 4 |
| Carbon dioxide | from mEq/L to mmol/L | 1 |
| Carbon dioxide | from mmol/L to mEq/L | 1 |
| Carotene | from µg/dL to µmol/L | 0.0186 |
| Carotene | from µmol/L to µg/dL | 53.76344086 |
| Ceruloplasmin | from mg/L to mg/dL | 0.1 |
| Ceruloplasmin | from mg/dL to mg/L | 10 |
| Chloride | from mEq/L to mmol/L | 1 |
| Chloride | from mmol/L to mEq/L | 1 |
| Cholesterol | from mg/dL to mmol/L | 0.0259 |
| Cholesterol | from mmol/L to mg/dL | 38.61003861 |
| Citrate | from mg/dL to µmol/L | 52.05 |
| Citrate | from µmol/L to mg/dL | 0.019212296 |
| Copper | from µg/dL to µmoI/L | 0.157 |
| Copper | from µmoI/L to µg/dL | 6.369426752 |
| Coproporphyrins (urine) | from nmol/d to µg/24 hr | 0.654878847 |
| Coproporphyrins (urine) | from µg/24 hr to nmol/d | 1.527 |
| Corticotropin (ACTH) | from pg/mL to pmol/L | 0.22 |
| Corticotropin (ACTH) | from pmol/L to pg/mL | 4.545454545 |
| Cortisol | from nmol/L to µg/dL | 0.036245016 |
| Cortisol | from µg/dL to nmol/L | 27.59 |
| Cotinine | from ng/mL to nmol/L | 5.68 |
| Cotinine | from nmol/L to ng/mL | 0.176056338 |
| Creatine | from mg/dL to µmol/L | 76.26 |
| Creatine | from µmol/L to mg/dL | 0.013113034 |
| Creatinine | from mg/dL to µmol/L | 88.4 |
| Creatinine | from µmol/L to mg/dL | 0.011312217 |
| Creatinine clearance | from mL/min to mL/s | 0.0167 |
| Creatinine clearance | from mL/s to mL/min | 59.88023952 |
| Cyanide | from mg/L to µmol/L | 23.24 |
| Cyanide | from µmol/L to mg/L | 0.04302926 |
| Dehydroepiandrosterone (DHEA) | from ng/mL to nmol/L | 3.47 |
| Dehydroepiandrosterone (DHEA) | from nmol/L to ng/mL | 0.288184438 |
| Desipramine | from ng/mL to nmol/L | 3.75 |
| Desipramine | from nmol/L to ng/mL | 0.266666667 |
| Diazepam | from µg/mL to µmol/L | 3.512 |
| Diazepam | from µmol/L to µg/mL | 0.284738041 |
| Digoxin | from ng/mL to nmol/L | 1.281 |
| Digoxin | from nmol/L to ng/mL | 0.780640125 |
| Epinephrine | from pg/mL to pmol/L | 5.46 |
| Epinephrine | from pmol/L to pg/mL | 0.183150183 |
| Estradiol | from pg/mL to pmol/L | 3.671 |
| Estradiol | from pmol/L to pg/mL | 0.272405339 |
| Estriol | from ng/mL to nmol/L | 3.467 |
| Estriol | from nmol/L to ng/mL | 0.288433804 |
| Estrone | from ng/dL to pmoI/L | 37 |
| Estrone | from pmoI/L to ng/dL | 0.027027027 |
| Ethanol (ethyl alcohol) | from mg/dL to mmol/L | 0.217 |
| Ethanol (ethyl alcohol) | from mmol/L to mg/dL | 4.608294931 |
| Ethylene glycol | from mg/L to µmol/L | 16.11 |
| Ethylene glycol | from µmol/L to mg/L | 0.062073246 |
| Ferritin | from ng/mL to pmol/L | 2.247 |
| Ferritin | from pmol/L to ng/mL | 0.445037828 |
| Fibrinogen | from mg/dL to µmol/L | 0.0294 |
| Fibrinogen | from µmol/L to mg/dL | 34.01360544 |
| Fluoride | from µg/mL to µmol/L | 52.6 |
| Fluoride | from µmol/L to µg/mL | 0.019011407 |
| Folate | from ng/mL to nmol/L | 2.266 |
| Folate | from nmol/L to ng/mL | 0.441306267 |
| Follicle-stimulating hormone | from IU/L to mIU/mL | 1 |
| Follicle-stimulating hormone | from mIU/mL to IU/L | 1 |
| Fructose | from mg/dL to µmol/L | 55.5 |
| Fructose | from µmol/L to mg/dL | 0.018018018 |
| Galactose | from mg/dL to µmol/L | 55.506 |
| Galactose | from µmol/L to mg/dL | 0.01801607 |
| Glucagon | from ng/L to pg/mL | 1 |
| Glucagon | from pg/mL to ng/L | 1 |
| Glucose | from mg/dL to mmol/L | 0.0555 |
| Glucose | from mmol/L to mg/dL | 18.01801802 |
| Glutamine | from mg/dL to µmol/L | 68.42 |
| Glutamine | from µmol/L to mg/dL | 0.014615609 |
| Glycerol (free) | from mg/dL to µmol/L | 108.59 |
| Glycerol (free) | from µmol/L to mg/dL | 0.009208951 |
| Glycine | from mg/dL to µmol/L | 133.3 |
| Glycine | from µmol/L to mg/dL | 0.007501875 |
| Haptoglobin | from mg/dL to µmol/L | 0.1 |
| Haptoglobin | from µmol/L to mg/dL | 10 |
| HbA1C | from % of total to Proportion of total | 0.01 |
| HbA1C | from Proportion of total to % of total | 100 |
| Hematocrit | from % to Proportion of 1.0 | 0.01 |
| Hematocrit | from Proportion of 1.0 to % | 100 |
| Hemoglobin (whole blood) | from g/L to g/dL | 0.1 |
| Hemoglobin (whole blood) (g/dL->g/L) | from g/dL to g/L | 10 |
| High-density lipoprotein (HDL-C) | from mg/dL to mmol/L | 0.0259 |
| High-density lipoprotein (HDL-C) | from mmol/L to mg/dL | 38.61003861 |
| Histidine | from mg/dL to µmol/L | 64.45 |
| Histidine | from µmol/L to mg/dL | 0.015515904 |
| Homocysteine (total) | from mg/L to µmol/L | 7.397 |
| Homocysteine (total) | from µmol/L to mg/L | 0.135189942 |
| Human chorionic gonadotropin (HCG) | from IU/L to mlU/mL | 1 |
| Human chorionic gonadotropin (HCG) | from mlU/mL to IU/L | 1 |
| Hydroxybutyric acid | from mg/dL to µmol/L | 96.05 |
| Hydroxybutyric acid | from µmol/L to mg/dL | 0.010411244 |
| Hydroxyproline | from mg/dL to µmol/L | 76.3 |
| Hydroxyproline | from µmol/L to mg/dL | 0.01310616 |
| Immunoglobulin D (IgD) | from mg/L to mg/dL | 0.1 |
| Immunoglobulin D (IgD) | from mg/dL to mg/L | 10 |
| Immunoglobulin E (IgE) | from mg/L to mg/dL | 0.1 |
| Immunoglobulin E (IgE) | from mg/dL to mg/L | 10 |
| Immunoglobulin G (IgG) | from g/L to mg/dL | 100 |
| Immunoglobulin G (IgG) | from mg/dL to g/L | 0.01 |
| Immunoglobulin M (IgM) | from g/L to mg/dL | 100 |
| Immunoglobulin M (IgM) | from mg/dL to g/L | 0.01 |
| Immunoglobulin A (IgA) | from g/L to mg/dL | 100 |
| Immunoglobulin A (IgA) | from mg/dL to g/L | 0.01 |
| Insulin | from pmol/L to µIU/mL | 0.143988481 |
| Insulin | from µIU/mL to pmol/L | 6.945 |
| Iron binding capacity, total | from µg/dL to µmol/L | 0.179 |
| Iron binding capacity, total | from µmol/L to µg/dL | 5.586592179 |
| Iron, total | from µg/dL to µmol/L | 0.179 |
| Iron, total | from µmol/L to µg/dL | 5.586592179 |
| Lactate dehydrogenase | from % to Proportion of 1.0 | 0.01 |
| Lactate dehydrogenase | from Proportion of 1.0 to % | 100 |
| Lactate (lactic acid) | from mg/dL to mmol/L | 0.111 |
| Lactate (lactic acid) | from mmol/L to mg/dL | 9.009009009 |
| Lead | from µg/dL to µmol/L | 0.0483 |
| Lead | from µmol/L to µg/dL | 20.70393375 |
| Leucine | from mg/dL to µmol/L | 76.237 |
| Leucine | from µmol/L to mg/dL | 0.01311699 |
| Lipids (total) | from g/L to mg/dL | 100 |
| Lipids (total) | from mg/dL to g/L | 0.01 |
| Lipoprotein (a) | from mg/dL to µmol/L | 0.0357 |
| Lipoprotein (a) | from µmol/L to mg/dL | 28.01120448 |
| Lithium | from mEq/L to mmol/L | 1 |
| Lithium | from mmol/L to mEq/L | 1 |
| Low-density lipoprotein | from mg/dL to mmol/L | 0.0259 |
| Low-density lipoprotein | from mmol/L to mg/dL | 38.61003861 |
| Lysine | from mg/dL to µmol/L | 68.5 |
| Lysine | from µmol/L to mg/dL | 0.01459854 |
| Magnesium | from mg/dL to mmol/L | 0.411 |
| Magnesium | from mmol/L to mg/dL | 2.433090024 |
| Manganese | from ng/mL to nmol/L | 18.2 |
| Manganese | from nmol/L to ng/mL | 0.054945055 |
| Methanol | from mg/L to mmol/L | 0.0312 |
| Methanol | from mmol/L to mg/L | 32.05128205 |
| Methionine | from mg/dL to µmol/L | 67.02 |
| Methionine | from µmol/L to mg/dL | 0.014920919 |
| Myoglobin | from nmol/L to µg/L | 17.51313485 |
| Myoglobin | from µg/L to nmol/L | 0.0571 |
| Nicotine | from mg/L to µmol/L | 6.164 |
| Nicotine | from µmol/L to mg/L | 0.162232317 |
| Nitrogen, nonprotein | from mg/dL to mmol/L | 0.714 |
| Nitrogen, nonprotein | from mmol/L to mg/dL | 1.400560224 |
| Norepinephrine | from nmol/L to pg/mL | 169.2047377 |
| Norepinephrine | from pg/mL to nmol/L | 0.00591 |
| Ornithine | from mg/dL to µmol/L | 75.67 |
| Ornithine | from µmol/L to mg/dL | 0.013215277 |
| Osteocalcin | from nmol/L to µg/L | 5.847953216 |
| Osteocalcin | from µg/L to nmol/L | 0.171 |
| Oxalate | from mg/L to µmol/L | 11.1 |
| Oxalate | from µmol/L to mg/L | 0.09009009 |
| Parathyroid hormone | from ng/L to pg/mL | 1 |
| Parathyroid hormone | from pg/mL to ng/L | 1 |
| Phenobarbital | from mg/L to µmol/L | 4.31 |
| Phenobarbital | from µmol/L to mg/L | 0.232018561 |
| Phenylalanine | from mg/dL to µmol/L | 60.54 |
| Phenylalanine | from µmol/L to mg/dL | 0.016518005 |
| Phenytoin | from µg/mL to µmoI/L | 3.96 |
| Phenytoin | from µmoI/L to µg/mL | 0.252525253 |
| Phosphorus | from mg/dL to mmol/L | 0.323 |
| Phosphorus | from mmol/L to mg/dL | 3.095975232 |
| Plasminogen | from mg/dL to µmol/L | 0.113 |
| Plasminogen | from µmol/L to mg/dL | 8.849557522 |
| Plasminogen activator inhibitor | from IU/L to mIU/mL | 1 |
| Plasminogen activator inhibitor | from mIU/mL to IU/L | 1 |
| Platelets (thrombocytes) | from x 103/µL to x 109/L | 1 |
| Platelets (thrombocytes) | from x 109/L to x 103/µL | 1 |
| Potassium | from mEq/L to mmol/L | 1 |
| Potassium | from mmol/L to mEq/L | 1 |
| Pregnanetriol (urine) | from mg/24 h to µmol/d | 2.97 |
| Pregnanetriol (urine) | from µmol/d to mg/24 h | 0.336700337 |
| Progesterone | from ng/mL to nmol/L | 3.18 |
| Progesterone | from nmol/L to ng/mL | 0.314465409 |
| Prolactin | from pmol to µg/L | 0.023000138 |
| Prolactin | from µg/L to pmol | 43.478 |
| Proline | from mg/dL to µmol/L | 86.86 |
| Proline | from µmol/L to mg/dL | 0.011512779 |
| Prostate-specific antigen | from ng/mL to µg/L | 1 |
| Prostate-specific antigen | from µg/L to ng/mL | 1 |
| Protein, total | from g/L to g/dL | 0.1 |
| Protein, total | from g/dL to g/L | 10 |
| Prothrombin | from g/L to µmol/L | 13.889 |
| Prothrombin | from µmol/L to g/L | 0.071999424 |
| Protoporphyrin, erythrocyte | from µg/dL to µmol/L | 0.01777 |
| Protoporphyrin, erythrocyte | from µmol/L to µg/dL | 56.27462015 |
| Pyruvate | from mg/dL to µmoI/L | 113.6 |
| Pyruvate | from µmoI/L to mg/dL | 0.008802817 |
| Quinidine | from µg/mL to µmol/L | 3.08 |
| Quinidine | from µmol/L to µg/mL | 0.324675325 |
| Red blood cell count | from x 1012/L to x 106/µL | 1 |
| Red blood cell count | from x 106/µL to x 1012/L | 1 |
| Renin | from pg/mL to pmol/L | 0.0237 |
| Renin | from pmol/L to pg/mL | 42.19409283 |
| Salicylate | from mg/L to mmol/L | 0.00724 |
| Salicylate | from mmol/L to mg/L | 138.121547 |
| Serine | from mg/dL to µmol/L | 95.2 |
| Serine | from µmol/L to mg/dL | 0.010504202 |
| Serotonin (5-hydroxytryptamine) | from ng/mL to µmol/L | 0.00568 |
| Serotonin (5-hydroxytryptamine) | from µmol/L to ng/mL | 176.056338 |
| Sodium | from mEq/L to mmol/L | 1 |
| Sodium | from mmol/L to mEq/L | 1 |
| Somatomedin-C (insulin-like growth factor) | from ng/mL to nmol/L, coagulation factor II | 0.131 |
| Somatomedin-C (insulin-like growth factor) | from nmol/L  to ng/mL, coagulation factor II | 7.633587786 |
| Somatostatin | from pg/mL to pmol/L | 0.611 |
| Somatostatin | from pmol/L to pg/mL | 1.636661211 |
| Testosterone | from ng/dL to nmol/L | 0.0347 |
| Testosterone | from nmol/L to ng/dL | 28.8184438 |
| Theophylline | from µg/mL to µmol/L | 5.55 |
| Theophylline | from µmol/L to µg/mL | 0.18018018 |
| Thiocyanate | from mg/L to µmol/L | 17.2 |
| Thiocyanate | from µmol/L to mg/L | 0.058139535 |
| Threonine | from mg/dL to µmol/L | 83.95 |
| Threonine | from µmol/L to mg/dL | 0.011911852 |
| Thyroglobulin | from ng/mL to µg/L | 1 |
| Thyroglobulin | from µg/L to ng/mL | 1 |
| Thyroxine, free T4 | from ng/dL to pmol/L | 12.87 |
| Thyroxine, free T4 | from pmol/L to ng/dL | 0.077700078 |
| Thyroxine, total T4 | from nmol/L to µg/dL | 0.077700078 |
| Thyroxine, total T4 | from µg/dL to nmol/L | 12.87 |
| Transferrin | from g/L to mg/dL | 100 |
| Transferrin | from mg/dL to g/L | 0.01 |
| Triglycerides | from mg/dL to mmol/L | 0.0113 |
| Triglycerides | from mmol/L to mg/dL | 88.49557522 |
| Troponin I (cardiac) | from ng/mL to µg/L | 1 |
| Troponin I (cardiac) | from µg/L to ng/mL | 1 |
| Troponin T (cardiac) | from ng/mL to µg/L | 1 |
| Troponin T (cardiac) | from µg/L to ng/mL | 1 |
| Tryptophan | from mg/dL to µmol/L | 48.97 |
| Tryptophan | from µmol/L to mg/dL | 0.020420666 |
| Tyrosine | from mg/dL to µmol/L | 55.19 |
| Tyrosine | from µmol/L to mg/dL | 0.018119224 |
| Urea nitrogen | from mg/dL to mmol/L | 0.357 |
| Urea nitrogen | from mmol/L to mg/dL | 2.801120448 |
| Uric acid | from mg/dL to µmol/L | 59.48 |
| Uric acid | from µmol/L to mg/dL | 0.016812374 |
| Valine | from mg/dL to µmol/L | 85.5 |
| Valine | from µmol/L to mg/dL | 0.011695906 |
| Vasoactive intestinal polypeptide | from ng/L to pg/mL | 1 |
| Vasoactive intestinal polypeptide | from pg/mL to ng/L | 1 |
| Vitamin A (retinol) | from µg/dL to µmoI/L | 0.0349 |
| Vitamin A (retinol) | from µmoI/L to µg/dL | 28.65329513 |
| Vitamin B12 (cyanocobalamin) | from pg/mL to pmol/L | 0.738 |
| Vitamin B12 (cyanocobalamin) | from pmol/L to pg/mL | 1.35501355 |
| Vitamin B6 (pyridoxine) | from ng/mL to nmol/L | 4.046 |
| Vitamin B6 (pyridoxine) | from nmol/L to ng/mL | 0.247157687 |
| Vitamin C (ascorbic acid) | from mg/dL to µmol/L | 56.78 |
| Vitamin C (ascorbic acid) | from µmol/L to mg/dL | 0.017611835 |
| Vitamin E | from mg/dL to µmoI/L | 23.22 |
| Vitamin E | from µmoI/L to mg/dL | 0.043066322 |
| Vitamin K | from ng/mL to nmol/L | 2.22 |
| Vitamin K | from nmol/L to ng/mL | 0.45045045 |
| Warfarin | from µg/mL to µmol/L | 3.247 |
| Warfarin | from µmol/L to µg/mL | 0.307976594 |
| White blood cell count | from x 103/µL to x 109/L | 1 |
| White blood cell count | from x 109/L to x 103/µL | 1 |
| Zinc | from µg/dL to µmoI/L | 0.153 |
| Zinc | from µmoI/L to µg/dL | 6.535947712 |
| alpha -Fetoprotein | from ng/mL to µg/L | 1 |
| alpha -Fetoprotein | from µg/L to ng/mL | 1 |
| alpha1-Antitrypsin | from mg/dL to µmol/L | 0.184 |
| alpha1-Antitrypsin | from µmol/L to mg/dL | 5.434782609 |
| lsoleucine | from mg/dL to µmol/L | 76.24 |
| lsoleucine | from µmol/L to mg/dL | 0.013116474 |
| lsopropanol | from mg/L to mmol/L | 0.0166 |
| lsopropanol | from mmol/L to mg/L | 60.24096386 |
| 1,25-Dihydroxyvitamin D | from pg/mL to pmol/L | 2.6 |
| 1,25-Dihydroxyvitamin D | from pmol/L to pg/mL | 0.384615385 |
| 25-Hydroxyvitamin D | from ng/mL to nmol/L | 2.496 |
| 25-Hydroxyvitamin D | from nmol/L to ng/mL | 0.400641026 |
| Free T3 | from pg/dL to pmol/L | 0.0154 |
| Free T3 | from pmol/L to pg/dL | 64.93506494 |
| Free T3 | from ng/dL to nmol/L | 0.0154 |
| Free T3 | from nmol/L to ng/dL | 64.93506494 |

---

---`;

  return (
    <div className="pt-[20%] grid grid-cols-12 gap-6  h-fit">
      {open && (
        <div className="md:col-span-3 col-span-12 flex md:relative flex-col gap-3 fixed bottom-16 md:bottom-0 right-8 md:right-0  bg-[#202835] md:bg-transparent p-3 md:p-0 rounded">
          <Item label="Heading 1" isActive={true} />
          <Item label="Heading 2" />
        </div>
      )}

      <button
        className="fixed right-4 top-[95%] bg-primary z-50 size-7 rounded-full flex md:hidden justify-center items-center"
        onClick={() => setOpen(!open)}
      >
        {!open ? <Burger /> : <Close />}
      </button>

      <div className="md:col-span-9 col-span-12 bg-[#48647D3D] p-4 rounded overflow-hidden">
        <RemarkFC doc={doc} />
      </div>
    </div>
  );
};

function Item({ label, isActive }: { label: string; isActive?: boolean }) {
  return (
    <Link
      href={`/guide?title=${label}`}
      className={cn("text-start bg-[#48647D3D] px-4 py-3 rounded", {
        "bg-primary": isActive,
      })}
    >
      <Text as="h2" size="et" className="font-bold">
        {label}
      </Text>
    </Link>
  );
}
export default GuidePage;
